// app/api/db-test/route.js
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Attempting database connection test...');

    // Perform a simple, low-cost query to check connectivity.
    const userCount = await prisma.user.count();

    console.log('Database connection test successful. User count:', userCount);

    return NextResponse.json(
      {
        message: 'Database connection successful.',
        userCount: userCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[DATABASE_CONNECTION_TEST_ERROR]', error);

    // Provide as much detail as possible in the error response
    return NextResponse.json(
      {
        message: 'Database connection failed.',
        error: {
          name: error.name,
          message: error.message,
          code: error.code, // Prisma errors often have a code
          meta: error.meta,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
}
