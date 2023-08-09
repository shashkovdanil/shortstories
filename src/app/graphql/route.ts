import type { NextRequest } from 'next/server'

import { Resolvers } from '@/__generated__/resolvers-types'
import { schema } from '@/schema'
import { type GraphQLContext, createContext } from '@/services/context'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

const server = new ApolloServer<Resolvers>({
  resolvers: {
    Query: {
      genres: async (parent, args, ctx) => {
        console.log(ctx)
        const genres = await ctx.prisma.genres.findMany()

        return genres
      },
    },
  } as Resolvers<GraphQLContext>,
  typeDefs: schema,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => createContext({ req }),
})

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
