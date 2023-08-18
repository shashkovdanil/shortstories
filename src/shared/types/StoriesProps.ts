import type { Exact } from '@/__generated__/graphql'
import type { TypedDocumentNode } from '@apollo/client'

import { HOME_PAGE_QUERY, ME_QUERY, USER_QUERY } from '@/graphql/queries'

export type QueriesWithStories =
  | typeof HOME_PAGE_QUERY
  | typeof ME_QUERY
  | typeof USER_QUERY

type QueryVariablesType<Q extends QueriesWithStories> =
  Q extends TypedDocumentNode<any, infer V> ? V : never
type ExactType<Q extends QueriesWithStories> =
  QueryVariablesType<Q> extends Exact<infer E> ? E : never
export type ResponseType<Q extends QueriesWithStories> =
  Q extends TypedDocumentNode<infer R, any> ? R : never

export type StoriesProps<Q extends QueriesWithStories> = {
  query: Q
  storiesKey: 'favStories' | 'stories' | 'writtenStories'
  variables: Omit<ExactType<Q>, 'limit' | 'offset'>
}
