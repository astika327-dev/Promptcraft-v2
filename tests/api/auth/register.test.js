// tests/api/auth/register.test.js
import { POST } from '@/app/api/auth/register/route';
import prisma from '@/lib/prisma';

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, { status }) => {
      return {
        status,
        json: async () => body,
      };
    },
  },
}));

describe('POST /api/auth/register', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if password is less than 8 characters', async () => {
    const req = {
      json: async () => ({
        email: 'test@example.com',
        password: 'short',
      }),
    };

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.message).toBe('Password must be at least 8 characters long.');
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});
