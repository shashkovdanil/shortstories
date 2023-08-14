import { ApolloWrapper } from '@/services/ApolloWrapper'

import './globals.css'
import '@/styles/base.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
