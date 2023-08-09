import type { GraphQLContext } from '@/services/context'

import { MutationResolvers } from '@/__generated__/resolvers-types'
import { isCommentOwner } from '@/features/comments/utils'
import { isAuthenticated } from '@/services/auth'

type Mutation = MutationResolvers<GraphQLContext>

type CommentsMutations = {
  createComment: Mutation['createComment']
  deleteComment: Mutation['deleteComment']
  updateComment: Mutation['updateComment']
}

export const mutations: CommentsMutations = {
  createComment: async (_, { body, commentId, id }, ctx) => {
    isAuthenticated(ctx)

    const comment = await ctx.prisma.comments.create({
      data: {
        body,
        commentId,
        storyId: id,
        userId: ctx.currentUser.id,
      },
      include: {
        users: true,
      },
    })

    return {
      ...comment,
      user: comment.users,
    }
  },
  deleteComment: async (_, { commentId, hasChildren, id }, ctx) => {
    isCommentOwner(ctx, commentId)

    const comment = await ctx.prisma.comments.findUnique({
      include: {
        users: true,
      },
      where: {
        id,
      },
    })

    const commentResponse = {
      ...comment,
      user: comment.users,
    } as const

    if (commentId) {
      const parent = await ctx.prisma.comments.findUnique({
        where: {
          id: commentId,
        },
      })

      if (parent.body === null) {
        await ctx.prisma.comments.deleteMany({
          where: {
            AND: [{ id: commentId }, { id }],
          },
        })

        return commentResponse
      }
    }

    if (hasChildren) {
      const cleared = await ctx.prisma.comments.update({
        data: {
          body: null,
        },
        include: {
          users: true,
        },
        where: {
          id,
        },
      })

      return {
        ...cleared,
        user: cleared.users,
      }
    }

    await ctx.prisma.comments.delete({
      where: {
        id,
      },
    })

    return commentResponse
  },
  updateComment: async (_, { body, id }, ctx) => {
    isCommentOwner(ctx, id)

    const comment = await ctx.prisma.comments.update({
      data: {
        body,
      },
      include: {
        users: true,
      },
      where: {
        id,
      },
    })

    return {
      ...comment,
      user: comment.users,
    }
  },
}
