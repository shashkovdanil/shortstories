'use client'

import type { StoriesFragment } from '@/__generated__/graphql'
import type {
  QueriesWithStories,
  ResponseType,
  StoriesProps,
} from '@/shared/types/StoriesProps'

import { Button } from '@/newComponents/Button'
import { LIMIT_STORIES_PER_PAGE } from '@/shared/const'
import {
  useBackgroundQuery,
  useReadQuery,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { useCallback, useTransition } from 'react'

export function ClientStories<Q extends QueriesWithStories>({
  query,
  storiesKey,
  variables,
}: StoriesProps<Q>) {
  const [isPending, startTransition] = useTransition()

  const [queryRef, { fetchMore }] = useBackgroundQuery<ResponseType<Q>>(query)
  const { data } = useReadQuery(queryRef)

  const { edges, pageInfo } = data[storiesKey] as StoriesFragment

  const count = edges.length

  function handleLoadMore() {
    startTransition(async () => {
      await fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return fetchMoreResult
            ? ({
                [storiesKey]: {
                  ...fetchMoreResult[storiesKey],
                  edges: [
                    ...previousResult[storiesKey].edges,
                    ...fetchMoreResult[storiesKey].edges,
                  ],
                },
              } as ResponseType<Q>)
            : previousResult
        },
        variables: {
          ...variables,
          offset: count,
        },
      })
    })
  }

  return (
    <>
      {edges.slice(LIMIT_STORIES_PER_PAGE).map(story => (
        <div key={story.id}>
          {story.title} {story.id}
        </div>
      ))}
      {count === pageInfo.limit + pageInfo.offset && (
        <div className="mt-5 flex justify-center">
          <Button loading={isPending} onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  )
}
