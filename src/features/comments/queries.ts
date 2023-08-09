import type { GraphQLContext } from '@/services/context'

import { QueryResolvers } from '@/__generated__/resolvers-types'

type Query = QueryResolvers<GraphQLContext>

type CommentsQueries = {
  comments: Query['comments']
}

export const queries: CommentsQueries = {
  comments: async (_, { storyId }, ctx) => {
    const comments = await ctx.prisma.comments.findMany({
      include: {
        users: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        storyId,
      },
    })

    return comments.map(comment => ({
      ...comment,
      user: comment.users,
    }))
  },
}
