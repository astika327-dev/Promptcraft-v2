// app/api/templates/[id]/rate/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const templateId = params.id;
  const userId = session.user.id;

  try {
    const { rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Verify user has purchased the template
    const purchase = await prisma.transaction.findFirst({
      where: {
        templateId,
        buyerId: userId,
        status: 'success',
      },
    });

    if (!purchase) {
      return NextResponse.json({ message: 'You must purchase a template to rate it' }, { status: 403 });
    }

    // Create or update rating
    const newRating = await prisma.rating.upsert({
        where: {
            userId_templateId: { // This assumes you add a @@unique([userId, templateId]) constraint to your schema
                userId,
                templateId
            }
        },
        update: { rating, comment },
        create: {
            templateId,
            userId,
            rating,
            comment,
        }
    });

    // Recalculate average rating for the template
    const allRatings = await prisma.rating.findMany({ where: { templateId } });
    const totalRating = allRatings.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = totalRating / allRatings.length;

    await prisma.template.update({
      where: { id: templateId },
      data: { ratingAvg: parseFloat(avgRating.toFixed(2)) },
    });

    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    // This will fail if the unique constraint is not on the schema.
    // Let's add it.
    if (error.code === 'P2002') {
        return NextResponse.json({ message: 'You have already rated this template.' }, { status: 409 });
    }
    console.error("Failed to submit rating:", error);
    return NextResponse.json({ message: 'Failed to submit rating' }, { status: 500 });
  }
}
