'use server'

import type { StoriesFragment } from '@/__generated__/graphql'
import type {
  QueriesWithStories,
  ResponseType,
  StoriesProps,
} from '@/shared/types/StoriesProps'

import { StoryCard } from '@/newComponents/StoryCard'
import { Title } from '@/newComponents/Title'
import { getClient } from '@/services/client'

export async function ServerStories<Q extends QueriesWithStories>({
  query,
  storiesKey,
  variables,
}: StoriesProps<Q>) {
  const { data } = await getClient().query<ResponseType<Q>>({
    query,
    variables,
  })
  const stories = data[storiesKey] as StoriesFragment

  if (stories.edges.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6">
        <Title level={2}>No stories</Title>
      </div>
    )
  }

  return stories.edges.map(story => <StoryCard key={story.id} {...story} />)
}
