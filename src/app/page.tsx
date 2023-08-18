import { Hero } from '@/app/_components/Hero'
import { HOME_PAGE_QUERY } from '@/graphql/queries'
import { Footer } from '@/newComponents/Footer'
import { Header } from '@/newComponents/Header'
import { Stories } from '@/newComponents/Stories'

export default async function IndexPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-5xl px-6">
          <Stories
            query={HOME_PAGE_QUERY}
            storiesKey="stories"
            variables={{}}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
