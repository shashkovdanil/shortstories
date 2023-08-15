import StoryCreator from '@/components/story-creator'
import { CHECK_LOGGED_IN_QUERY } from '@/graphql/queries'
import { getClient } from '@/services/client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CreateStoryPage() {
  const {
    data: { me },
  } = await getClient().query({
    query: CHECK_LOGGED_IN_QUERY,
  })

  if (!me) {
    redirect('/signin?return=create-story')
  }

  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  return <StoryCreator theme={theme || 'light'} userId={me.id} />
}
