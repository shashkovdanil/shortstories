import * as fragments from '@/graphql/fragments'
import { HttpLink } from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { cookies } from 'next/headers'

export const { getClient } = registerApolloClient(() => {
  const token = cookies().get('token')
  const headers = token ? { Cookie: `token=${token.value}` } : {}

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      fragments: createFragmentRegistry(...Object.values(fragments)),
    }),
    connectToDevTools: true,
    link: new HttpLink({
      credentials: 'same-origin',
      headers,
      uri: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/graphql`,
    }),
  })
})
