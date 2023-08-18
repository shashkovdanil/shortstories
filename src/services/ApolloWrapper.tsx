'use client'

import type { PropsWithChildren } from 'react'

import * as fragments from '@/graphql/fragments'
import { ApolloLink, HttpLink } from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

const makeClient = (token: string) => () => {
  const headers = token ? { Cookie: `token=${token}` } : {}

  const httpLink = new HttpLink({
    credentials: 'same-origin',
    headers,
    uri: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/graphql`,
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      fragments: createFragmentRegistry(...Object.values(fragments)),
    }),
    connectToDevTools: true,
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

type Props = {
  token: string
}

export function ApolloWrapper({ children, token }: PropsWithChildren<Props>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient(token)}>
      {children}
    </ApolloNextAppProvider>
  )
}
