import type { Metadata } from 'next'

import { ApolloWrapper } from '@/services/ApolloWrapper'
import { cookies } from 'next/headers'

import './globals.css'
import 'remixicon/fonts/remixicon.css'

export const metadata: Metadata = {
  description:
    'Ignite your imagination and delve into the world of amateur short story writing with Shortstories. Unleash your creativity, pen captivating tales, and embark on a literary journey unlike any other. Join Shortstories today to craft, share, and explore an array of immersive storytelling experiences.',
  title:
    'Elevate Your Imagination with Shortstories: Your Hub for Amateur Short Story Creation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')?.value

  return (
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <body>
        <div className="grid min-h-full grid-rows-[auto_1fr_auto]">
          <ApolloWrapper token={token}>{children}</ApolloWrapper>
        </div>
      </body>
    </html>
  )
}
