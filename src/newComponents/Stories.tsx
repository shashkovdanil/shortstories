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
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <ServerStories {...props} />
      <ClientStories {...props} />
    </div>
  )
}
