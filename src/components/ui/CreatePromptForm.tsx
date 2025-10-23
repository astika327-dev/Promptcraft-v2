"use client"

import { useFormState, useFormStatus } from "react-dom"
import { createPrompt, State } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialState: State = {
  message: null,
  errors: {}
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Creating..." : "Create Prompt"}
    </Button>
  )
}

export function CreatePromptForm() {
  const [state, formAction] = useFormState(createPrompt, initialState)

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Create a New Prompt</CardTitle>
          <CardDescription>Share your creative prompt with the community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Title</label>
            <Input id="title" name="title" placeholder="e.g., A cat in a futuristic city" required />
            {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title.join(", ")}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="content">Content</label>
            <Textarea id="content" name="content" placeholder="Describe your prompt in detail..." required />
            {state.errors?.content && <p className="text-sm text-red-500">{state.errors.content.join(", ")}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
      {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
    </form>
  )
}
