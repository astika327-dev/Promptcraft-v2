// app/api/templates/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/templates - List templates with pagination
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  try {
    const templates = await prisma.template.findMany({
      where: { isPublished: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { creator: { select: { name: true, email: true } } },
    });

    const totalTemplates = await prisma.template.count({ where: { isPublished: true } });

    return NextResponse.json({
      templates,
      totalPages: Math.ceil(totalTemplates / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return NextResponse.json({ message: 'Failed to fetch templates' }, { status: 500 });
  }
}

// POST /api/templates - Create a new template
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, promptText, category, price } = body;

    // Basic validation
    if (!title || !description || !promptText || !category || price === undefined) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Simple rate limiting: check user's template creation for the day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const templatesToday = await prisma.template.count({
      where: {
        creatorId: session.user.id,
        createdAt: { gte: today },
      },
    });

    if (templatesToday >= 5) {
      return NextResponse.json({ message: 'You have reached the daily limit for template creation.' }, { status: 429 });
    }

    const newTemplate = await prisma.template.create({
      data: {
        title,
        description,
        promptText,
        category,
        price,
        isPublished: true, // Auto-publish for MVP
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error("Failed to create template:", error);
    return NextResponse.json({ message: 'Failed to create template' }, { status: 500 });
  }
}
