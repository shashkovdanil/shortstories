import { isAuthenticated } from '@/services/auth'
import { GraphQLContext } from '@/services/context'
import { Prisma } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const storiesInclude = {
  include: {
    _count: {
      select: {
        comments: true,
      },
    },
    genres: true,
    reactions: {
      include: {
        users: true,
      },
    },
    users: true,
    views: {
      include: {
        users: true,
      },
    },
  },
} as const

export const mapStoryToResponse = (
  story: Prisma.StoriesGetPayload<typeof storiesInclude>,
) => {
  return {
    body: story.body,
    createdAt: story.createdAt,
    genre: story.genres,
    id: story.id,
    length: story.length,
    stats: {
      comments: story._count.comments,
      dislikes: story.reactions
        .filter(reaction => reaction.state === 'Dislike')
        .map(reaction => reaction.users),
      likes: story.reactions
        .filter(reaction => reaction.state === 'Like')
        .map(reaction => reaction.users),
      views: story.views.map(view => view.users),
    },
    title: story.title,
    user: story.users,
  }
}

export const isStoryOwner = async (ctx: GraphQLContext, storyId: number) => {
  isAuthenticated(ctx)

  const story = await ctx.prisma.stories.findUnique({
    where: {
      id: storyId,
    },
  })

  if (story?.userId !== ctx.currentUser!.id) {
    throw new GraphQLError(`Access available only to author of story`, {
      extensions: {
        code: 'FORBIDDEN',
        http: {
          status: 403,
        },
        message: `Access available only to author of story`,
      },
    })
  }
}
