import { isAuthenticated } from '@/services/auth'
import { GraphQLContext } from '@/services/context'
import { GraphQLError } from 'graphql'

export const isCommentOwner = async (
  ctx: GraphQLContext,
  commentId: number,
) => {
  isAuthenticated(ctx)

  const comment = await ctx.prisma.comments.findUnique({
    where: {
      id: commentId,
    },
  })

  if (comment.userId !== ctx.currentUser!.id) {
    throw new GraphQLError(`Access available only to author of comment`, {
      extensions: {
        code: 'FORBIDDEN',
        http: {
          status: 403,
        },
        message: `Access available only to author of comment`,
      },
    })
  }
}
