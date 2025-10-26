// app/api/midtrans/notification/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

// This is a DUMMY webhook handler.
// A real handler MUST verify the Midtrans signature.
async function verifyMidtransSignature(orderId, statusCode, grossAmount, serverKey) {
  // In a real implementation, you'd receive a signature_key in the notification body.
  // The formula is: sha512(order_id + status_code + gross_amount + server_key)
  // For this dummy, we'll skip the verification.
  // const hash = crypto.createHash('sha512').update(`${orderId}${statusCode}${grossAmount}${serverKey}`).digest('hex');
  // return hash === signatureKeyFromMidtrans;
  return true; // DUMMY: ALWAYS TRUE
}

export async function POST(req) {
  try {
    const notification = await req.json();
    const { order_id, transaction_status, gross_amount } = notification;

    // --- SECURITY & VALIDATION ---
    // 1. Verify the signature (skipped in this dummy impl.)
    // const serverKey = process.env.MIDTRANS_SERVER_KEY;
    // if (!verifyMidtransSignature(order_id, notification.status_code, gross_amount, serverKey)) {
    //   return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    // }

    // 2. Find the transaction in your database
    const transaction = await prisma.transaction.findFirst({
      where: { midtransOrderId: order_id },
      include: { template: true },
    });

    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    // 3. Prevent duplicate processing
    if (transaction.status === 'success') {
      return NextResponse.json({ message: 'Transaction already processed' });
    }

    // 4. Update based on transaction status
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      // --- PAYMENT SUCCESS LOGIC ---
      const platformFee = Math.floor(transaction.amount * 0.10); // 10%
      const creatorFee = transaction.amount - platformFee;     // 90%

      await prisma.$transaction([
        // Update transaction status
        prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'success',
            platformFee,
            creatorFee,
          },
        }),
        // Increment template download count
        prisma.template.update({
          where: { id: transaction.templateId },
          data: { downloads: { increment: 1 } },
        }),
        // Credit the creator's wallet
        prisma.user.update({
          where: { id: transaction.template.creatorId },
          data: { walletBalance: { increment: creatorFee } },
        }),
      ]);

    } else if (transaction_status === 'cancel' || transaction_status === 'expire' || transaction_status === 'deny') {
      // --- PAYMENT FAILED LOGIC ---
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: 'failed' },
      });
    }

    // COST POINT: Every database write operation here (transaction, template, user)
    // can incur costs, especially with serverless databases that charge per operation.
    // Using prisma.$transaction is efficient as it bundles them.

    return NextResponse.json({ message: 'Notification processed' });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
