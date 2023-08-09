import type { GraphQLContext } from '@/services/context.js'

import { QueryResolvers } from '@/__generated__/resolvers-types.js'

type Query = QueryResolvers<GraphQLContext>

type UsersQueries = {
  me: Query['me']
  user: Query['user']
}

export const queries: UsersQueries = {
  me: async (_, __, ctx) => {
    return ctx.currentUser
  },
  user: async (_, { id }, ctx) => {
    const user = await ctx.prisma.users.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null

    return user
  },
}
