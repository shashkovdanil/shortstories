'use client'

import { meFragment } from '@/graphql/fragments'
import { SIGN_OUT_MUTATION } from '@/graphql/mutations'
import { ONLY_ME_QUERY } from '@/graphql/queries'
import { Link } from '@/newComponents/Link'
import { Modal } from '@/newComponents/Modal'
import { useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useCallback } from 'react'

export function Navigation() {
  const {
    data: { me },
  } = useSuspenseQuery(ONLY_ME_QUERY, {
    fetchPolicy: 'cache-first',
  })

  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    update: cache => {
      cache.writeFragment({
        data: null,
        fragment: meFragment,
        id: 'Me',
      })
    },
  })

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <>
      <div className="ml-auto flex md:hidden">
        <Modal
          reference={
            <button
              aria-label="Toggle Navigation Menu"
              className="relative flex h-12 w-12 flex-col justify-around rounded-sm p-3 pl-6 pr-0"
              type="button"
            >
              <div className="h-0.5 w-full bg-black" />
              <div className="h-0.5 w-full bg-black" />
              <div className="h-0.5 w-full bg-black" />
            </button>
          }
          description="Here you can navigate to other pages"
          fullScreen
          label="Navigation Menu"
        >
          <nav className="grid h-full w-full place-items-center">
            <ul className="flex flex-col gap-3 text-center">
              <li>
                <Link href="/create-story">
                  Write Story&nbsp;
                  <span aria-label="emoji" role="img">
                    ✍️
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/me">Profile</Link>
              </li>
              {me && (
                <li className="text-center">
                  <button
                    className="text-brand"
                    onClick={handleSignOut}
                    type="button"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </Modal>
      </div>
      <nav className="hidden items-center justify-end gap-6 md:flex">
        <Link href="/create-story">
          Write Story&nbsp;
          <span aria-label="emoji" role="img">
            ✍️
          </span>
        </Link>
        <Link href="/me">Profile</Link>
        {me && (
          <button className="text-brand" onClick={handleSignOut} type="button">
            Sign Out
          </button>
        )}
      </nav>
    </>
  )
}
