import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { Resolvers } from '@/__generated__/resolvers-types'
import type { NextRequest } from 'next/server'
import { readFileSync } from 'node:fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const schemaPath =
  process.env.NODE_ENV === 'development'
    ? './public/schema.graphql'
    : 'schema.graphql'
const typeDefs = readFileSync(schemaPath, 'utf8')

const server = new ApolloServer<Resolvers>({
  resolvers: {
    Query: {
      genres: async () => {
        const genres = await prisma.genres.findMany()

        return genres
      },
    },
  },
  typeDefs,
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
