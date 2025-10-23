"use server"

import { z } from "zod"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const PromptSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  content: z.string().min(10, "Prompt content must be at least 10 characters long."),
})

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createPrompt(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = PromptSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  })

  if (!validatedFields.success) {
    // For simplicity, we'll log the error.
    // In a real app, you'd return this to the form to show user-friendly errors.
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real app, you would get the user ID from the session.
  // For now, let's find or create a dummy user to associate the prompt with.
  let user = await prisma.user.findUnique({
    where: { email: "testuser@example.com" },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "testuser@example.com",
        name: "Test User",
      },
    });
  }

  try {
    await prisma.prompt.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        authorId: user.id,
      },
    })
  } catch (error) {
    console.error("Database Error:", error);
    // Handle database errors
    return { message: "Database Error: Failed to Create Prompt." };
  }

  revalidatePath("/")
  redirect("/")
}
