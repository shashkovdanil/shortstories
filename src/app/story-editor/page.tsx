import { CREATE_STORY_QUERY } from '@/graphql/queries'
import { getClient } from '@/services/client'
import { redirect } from 'next/navigation'

import { Form } from './_components/Form'

export default async function StoryEditor() {
  const {
    data: { genres, me },
  } = await getClient().query({
    query: CREATE_STORY_QUERY,
  })

  if (!me) {
    redirect('/signin')
  }

  return <Form genres={genres} meId={me.id} />
}
