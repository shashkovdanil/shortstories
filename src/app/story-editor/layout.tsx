import { Footer } from '@/newComponents/Footer'
import { Metadata } from 'next'

import { Header } from './_components/Header'

export const metadata: Metadata = {
  description: 'Write a story',
  openGraph: {
    description: 'Write a story',
    title: 'Shortstories - write a story',
    type: 'website',
  },
  title: 'Shortstories - write a story',
}

export default function StoryEditorLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-6">{children}</main>
      <Footer />
    </>
  )
}
