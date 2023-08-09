import { authenticateUser } from '@/services/auth'
import { PrismaClient, Users } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

type ServerContext = {
  req: NextRequest
}

export type GraphQLContext = {
  currentUser: Users | null
  prisma: PrismaClient
  req: NextRequest
}

export async function createContext(
  serverContext: ServerContext,
): Promise<GraphQLContext> {
  return {
    ...serverContext,
    currentUser: await authenticateUser(prisma, serverContext.req),
    prisma,
  }
}
