// app/api/templates/[id]/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  const templateId = params.id;

  try {
    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { creator: { select: { name: true, email: true } } },
    });

    if (!template) {
      return NextResponse.json({ message: 'Template not found' }, { status: 404 });
    }

    let isPurchased = false;
    if (session) {
      const purchase = await prisma.transaction.findFirst({
        where: {
          templateId,
          buyerId: session.user.id,
          status: 'success',
        },
      });
      isPurchased = !!purchase;
    }

    return NextResponse.json({ template, isPurchased });

  } catch (error) {
    console.error(`Failed to fetch template ${templateId}:`, error);
    return NextResponse.json({ message: 'Failed to fetch template' }, { status: 500 });
  }
}
