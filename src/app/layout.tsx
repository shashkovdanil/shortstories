import { ApolloWrapper } from '@/services/ApolloWrapper'
import { cookies } from 'next/headers'

import './globals.css'
import '@/styles/base.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')?.value

  return (
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <body>
        <ApolloWrapper token={token}>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
