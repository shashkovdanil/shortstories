'use client'

import StoryReader from '@/components/story-reader'
import { storyFragment } from '@/graphql/fragments'
import { VIEW_STORY_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'

export default function StoryPage({ params }: { params: { slug: string } }) {
  const [id] = params.slug.split('-')
  const nId = +id

  const [viewStory] = useMutation(VIEW_STORY_MUTATION, {
    update: (cache, mutationResult) => {
      const story = cache.readFragment({
        fragment: storyFragment,
        fragmentName: 'story',
        id: `Story:${nId}`,
      })

      const { userId } = mutationResult.data.viewStory

      cache.writeFragment({
        data: {
          ...story,
          stats: {
            ...story.stats,
            views: [
              ...story.stats.views,
              userId
                ? {
                    __typename: 'User',
                    id: userId,
                  }
                : null,
            ],
          },
        },
        fragment: storyFragment,
        fragmentName: 'story',
        id: `Story:${nId}`,
      })
    },
    variables: { id: nId },
  })

  return <StoryReader id={nId} theme={'light'} viewStory={viewStory} />
}
