// app/api/templates/[id]/buy/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const templateId = params.id;
  const userId = session.user.id;

  try {
    const template = await prisma.template.findUnique({ where: { id: templateId } });
    if (!template) {
      return NextResponse.json({ message: 'Template not found' }, { status: 404 });
    }

    // Check if user already owns the template
    const existingTransaction = await prisma.transaction.findFirst({
        where: { templateId, buyerId: userId, status: 'success' }
    });
    if(existingTransaction) {
        return NextResponse.json({ message: 'You already own this template' }, { status: 400 });
    }

    const orderId = `TX-${uuidv4()}`;

    // Create a pending transaction
    const transaction = await prisma.transaction.create({
      data: {
        templateId,
        buyerId: userId,
        amount: template.price,
        status: 'pending',
        midtransOrderId: orderId,
        platformFee: 0, // Will be calculated on success
        creatorFee: 0, // Will be calculated on success
      },
    });

    // --- DUMMY MIDTRANS INTEGRATION ---
    // In a real scenario, you would call the Midtrans API here to get a Snap token/URL
    // For this dummy implementation, we'll just return a success-like response.
    // This simulates the client receiving a "payment URL" and "paying".
    // The webhook will then need to be called to finalize.

    const dummyMidtransResponse = {
      transactionId: transaction.id,
      orderId: orderId,
      paymentUrl: `/api/midtrans/dummy-payment-success?order_id=${orderId}`, // A dummy URL to simulate successful payment
    };

    // SECURITY RISK: In a real app, never create the success URL like this.
    // The client should use the Snap JS library and Midtrans would handle the redirect.
    // This is purely for sandbox simulation.

    return NextResponse.json(dummyMidtransResponse);

  } catch (error) {
    console.error("Failed to create transaction:", error);
    return NextResponse.json({ message: 'Failed to create transaction' }, { status: 500 });
  }
}
