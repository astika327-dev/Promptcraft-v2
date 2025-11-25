// app/marketplace/my-library/page.jsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getPurchasedTemplates(userId) {
  const transactions = await prisma.transaction.findMany({
    where: {
      buyerId: userId,
      status: 'success',
    },
    include: {
      template: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return transactions.map(t => t.template);
}

export default async function MyLibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect or show a message
    return (
        <div className="min-h-screen bg-grid-pattern text-gray-200 flex flex-col items-center justify-center p-4 font-sans">
            <h1 className="text-4xl font-bold">Please sign in to view your library.</h1>
            <Link href="/auth/signin" className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg">
                Sign In
            </Link>
        </div>
    )
  }

  const templates = await getPurchasedTemplates(session.user.id);

  return (
    <div className="min-h-screen bg-grid-pattern text-gray-200 flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-6xl">
        <header className="py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            My Library
          </h1>
        </header>

        <main className="mt-8">
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <div key={template.id} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                  <p className="text-gray-400 mb-4">{template.description}</p>
                  <Link href={`/marketplace/template/${template.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    View Full Prompt
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">You haven't purchased any templates yet.</p>
          )}
        </main>
      </div>
    </div>
  );
}
