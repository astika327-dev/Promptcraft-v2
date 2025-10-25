# PromptCraft

PromptCraft is a Next.js 14 application that uses the OpenRouter API to refine simple ideas into detailed, ready-to-use prompts for AI models like MidJourney, DALL·E, or ChatGPT.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Environment Variables

Before deploying, you'll need to set up your environment variables.

1.  Create a `.env.local` file in the root of your project.
2.  Add your OpenRouter API key to the `.env.local` file:

```
OPENROUTER_API_KEY="your_openrouter_api_key_here"
```

When deploying to Vercel, you'll need to add the `OPENROUTER_API_KEY` as an environment variable in your Vercel project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
