import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { Resolvers } from '@/__generated__/resolvers-types'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { schema } from '@/schema'

const prisma = new PrismaClient()

const server = new ApolloServer<Resolvers>({
  resolvers: {
    Query: {
      genres: async () => {
        const genres = await prisma.genres.findMany()

        return genres
      },
    },
  },
  typeDefs: schema,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
