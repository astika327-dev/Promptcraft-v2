// app/api/auth/register/route.js
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json({ message: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'buyer', // Default role
      },
    });

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Registration API Error:', error);

    // Specific check for Prisma database connection errors
    if (error.name === 'PrismaClientInitializationError') {
      console.error('Prisma Initialization Error Code:', error.errorCode);
      return NextResponse.json(
        {
          message: 'Database connection error. Please check server configuration.',
          error: 'Cannot connect to the database.'
        },
        { status: 500 }
      );
    }

    if (error.code) { // Catch other Prisma-related errors
      console.error('Prisma Error Code:', error.code);
    }

    return NextResponse.json({ message: 'An internal server error occurred.', error: error.message }, { status: 500 });
  }
}
