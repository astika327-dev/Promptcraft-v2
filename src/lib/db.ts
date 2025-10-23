import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // The output path is now relative from `node_modules` where this code will be executed.
  // We need to adjust the import path in the generated client first.
  // For now, let's assume the default path works during generation,
  // and we'll fix the schema if needed.
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
