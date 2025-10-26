// app/api/midtrans/dummy-payment-success/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// THIS IS A DUMMY ROUTE FOR SIMULATION ONLY.
// IT WOULD NOT EXIST IN A PRODUCTION APPLICATION.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.json({ message: 'Order ID is required' }, { status: 400 });
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: { midtransOrderId: orderId },
    });

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found for dummy processing' }, { status: 404 });
    }

    // Simulate the notification body that Midtrans would send
    const dummyNotification = {
      order_id: orderId,
      transaction_status: 'settlement', // 'settlement' means payment was successful
      gross_amount: transaction.amount.toString(),
      // In a real scenario, many more fields would be present
    };

    // Simulate the webhook call
    const webhookUrl = new URL('/api/midtrans/notification', req.url).toString();

    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // In production, you might have an internal auth key for service-to-service calls
        },
        body: JSON.stringify(dummyNotification)
    });

    // Redirect user to their library to see the unlocked template
    const libraryUrl = new URL('/marketplace/my-library', req.url).toString();
    return NextResponse.redirect(libraryUrl);

  } catch (error) {
    console.error("Dummy payment simulation error:", error);
    return NextResponse.json({ message: 'Dummy payment simulation failed' }, { status: 500 });
  }
}
