import type { NextRequest } from 'next/server'

import { Resolvers } from '@/__generated__/resolvers-types'
import * as commentsResolvers from '@/features/comments/resolvers'
import * as storiesResolvers from '@/features/stories/resolvers'
import * as usersResolvers from '@/features/users/resolvers'
import { schema } from '@/schema'
import { type GraphQLContext, createContext } from '@/services/context'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

const server = new ApolloServer<Resolvers>({
  resolvers: {
    Mutation: {
      ...usersResolvers.mutations,
      ...storiesResolvers.mutations,
      ...commentsResolvers.mutations,
    },
    Query: {
      ...usersResolvers.queries,
      ...storiesResolvers.queries,
      ...commentsResolvers.queries,
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
