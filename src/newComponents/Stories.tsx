import type {
  QueriesWithStories,
  StoriesProps,
} from '@/shared/types/StoriesProps'

import { ClientStories } from '@/newComponents/ClientStories'
import { ServerStories } from '@/newComponents/ServerStories'

export async function Stories<Q extends QueriesWithStories>(
  props: StoriesProps<Q>,
) {
  return (
    <>
      <ServerStories {...props} />
      <ClientStories {...props} />
    </>
  )
}
