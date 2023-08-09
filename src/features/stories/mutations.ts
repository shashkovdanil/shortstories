import type { GraphQLContext } from '@/services/context'

import { MutationResolvers } from '@/__generated__/resolvers-types'
import {
  isStoryOwner,
  mapStoryToResponse,
  storiesInclude,
} from '@/features/stories/utils'
import { isAuthenticated } from '@/services/auth'

type Mutation = MutationResolvers<GraphQLContext>

type StoriesMutation = {
  createStory: Mutation['createStory']
  deleteStory: Mutation['deleteStory']
  dislikeStory: Mutation['dislikeStory']
  likeStory: Mutation['likeStory']
  updateStory: Mutation['updateStory']
  viewStory: Mutation['viewStory']
}

export const mutations: StoriesMutation = {
  createStory: async (_, args, ctx) => {
    isAuthenticated(ctx)

    const story = await ctx.prisma.stories.create({
      data: {
        ...args,
        length: args.body.length,
        userId: ctx.currentUser.id,
      },
      ...storiesInclude,
    })

    return mapStoryToResponse(story)
  },
  deleteStory: async (_, args, ctx) => {
    isStoryOwner(ctx, args.id)

    const story = await ctx.prisma.stories.delete({
      where: {
        id: args.id,
      },
      ...storiesInclude,
    })

    return mapStoryToResponse(story)
  },
  dislikeStory: async (_, args, ctx) => {
    isAuthenticated(ctx)

    const reaction = await ctx.prisma.reactions.findFirst({
      where: {
        storyId: args.id,
        userId: ctx.currentUser.id,
      },
    })

    if (reaction) {
      const { state } = reaction

      if (state === 'Like') {
        const dislike = await ctx.prisma.reactions.update({
          data: {
            state: 'Dislike',
          },
          where: {
            id: reaction.id,
          },
        })

        return dislike
      }

      await ctx.prisma.reactions.delete({
        where: {
          id: reaction.id,
          state: 'Dislike',
        },
      })

      return reaction
    }

    const newReaction = await ctx.prisma.reactions.create({
      data: {
        state: 'Dislike',
        storyId: args.id,
        userId: ctx.currentUser.id,
      },
    })

    return newReaction
  },
  likeStory: async (_, args, ctx) => {
    isAuthenticated(ctx)

    const reaction = await ctx.prisma.reactions.findFirst({
      where: {
        storyId: args.id,
        userId: ctx.currentUser.id,
      },
    })

    if (reaction) {
      const { state } = reaction

      if (state === 'Dislike') {
        const like = await ctx.prisma.reactions.update({
          data: {
            state: 'Like',
          },
          where: {
            id: reaction.id,
          },
        })

        return like
      }

      await ctx.prisma.reactions.delete({
        where: {
          id: reaction.id,
          state: 'Like',
        },
      })

      return reaction
    }

    const newReaction = await ctx.prisma.reactions.create({
      data: {
        state: 'Like',
        storyId: args.id,
        userId: ctx.currentUser.id,
      },
    })

    return newReaction
  },
  updateStory: async (_, args, ctx) => {
    isStoryOwner(ctx, args.id)

    const story = await ctx.prisma.stories.update({
      data: args,
      where: {
        id: args.id,
      },
      ...storiesInclude,
    })

    return mapStoryToResponse(story)
  },
  viewStory: async (_, args, ctx) => {
    const view = await ctx.prisma.views.create({
      data: {
        storyId: args.id,
        userId: ctx.currentUser.id,
      },
    })

    return view
  },
}
