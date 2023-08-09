import type { GraphQLContext } from '@/services/context'

import { QueryResolvers } from '@/__generated__/resolvers-types'
import { mapStoryToResponse, storiesInclude } from '@/features/stories/utils'

type Query = QueryResolvers<GraphQLContext>

type StoriesQueries = {
  genres: Query['genres']
  reactions: Query['reactions']
  stories: Query['stories']
  story: Query['story']
}

const betweenLength = (lengthType: string) => {
  switch (lengthType) {
    case 'short':
      return [1800, 8000]
    case 'middle':
      return [8000, 25000]
    case 'long':
      return [25000, 40000]
    default:
      return [1800, 40000]
  }
}

export const queries: StoriesQueries = {
  genres: async (_, __, ctx) => {
    const genres = await ctx.prisma.genres.findMany()

    return genres
  },
  reactions: async (_, { storyId }, ctx) => {
    const reactions = await ctx.prisma.reactions.findMany({
      where: {
        storyId,
      },
    })

    return reactions
  },
  stories: async (
    _,
    {
      genres,
      isLiked,
      length,
      limit = 20,
      mostCommented,
      mostViewed,
      offset = 0,
      userId,
    },
    ctx,
  ) => {
    function getOrderBy() {
      if (mostCommented) {
        return {
          comments: {
            _count: 'desc',
          },
        } as const
      }

      if (mostViewed) {
        return {
          views: {
            _count: 'desc',
          },
        } as const
      }

      return {
        createdAt: 'desc',
      } as const
    }

    function getWhere() {
      const result = {} as Record<string, unknown>

      if (genres?.length > 0) {
        result.genres = {
          id: {
            in: genres.map(gId => +gId),
          },
        }
      }

      if (length) {
        result.length = {
          gte: betweenLength(length)[0],
          lte: betweenLength(length)[1],
        }
      }

      if (userId) {
        console.log(userId)
        result.userId = {
          equals: userId,
        }
      }

      if (isLiked) {
        result.userId = {
          equals: userId,
        }
        result.reactions = {
          every: {
            state: 'Like',
          },
        }
      }

      return result
    }

    const where = getWhere()

    const stories = await ctx.prisma.stories.findMany({
      ...storiesInclude,
      orderBy: getOrderBy(),
      skip: offset,
      take: limit,
      ...(Object.keys(where).length === 0 ? {} : { where }),
    })

    const result = stories.map(mapStoryToResponse)

    const hasNextPage = result.length > limit
    const edges = hasNextPage ? result.slice(0, -1) : result
    return {
      edges,
      pageInfo: {
        limit,
        offset,
      },
    }
  },
  story: async (_, { id }, ctx) => {
    const story = await ctx.prisma.stories.findUnique({
      ...storiesInclude,
      where: {
        id,
      },
    })

    return mapStoryToResponse(story)
  },
}
