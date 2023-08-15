import StoryEditor from '@/components/story-editor'
import { CHECK_LOGGED_IN_QUERY, EDIT_STORY_QUERY } from '@/graphql/queries'
import { getClient } from '@/services/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function EditStoryPage({
  params,
}: {
  params: { id: string }
}) {
  const {
    data: { me },
  } = await getClient().query({
    query: CHECK_LOGGED_IN_QUERY,
  })

  if (!me) {
    redirect('/signin?return=create-story')
  }

  const { data } = await getClient().query({
    query: EDIT_STORY_QUERY,
    variables: { id: +params.id },
  })

  const cookieStore = cookies()
  const theme = cookieStore.get('theme') || 'light'

  return (
    <StoryEditor
      genres={data.genres}
      id={+params.id}
      story={data.story}
      theme={theme}
      userId={me.id}
    />
  )
}
