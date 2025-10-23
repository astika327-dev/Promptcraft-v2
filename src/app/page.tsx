import prisma from "@/lib/db";
import { CreatePromptForm } from "@/components/ui/CreatePromptForm";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const prompts = await prisma.prompt.findMany();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Promptcraft</h1>

      <div className="mb-8 max-w-xl mx-auto">
        <CreatePromptForm />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Community Prompts</h2>
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="border p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold">{prompt.title}</h3>
                <p className="mt-2 text-gray-700">{prompt.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">No prompts found.</p>
            <p className="text-gray-400 text-sm mt-2">Be the first to create one!</p>
          </div>
        )}
      </div>
    </main>
  );
}
