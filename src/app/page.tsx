import { Button } from '@/components/Button'
import { FullPageLoader } from '@/components/FullPageLoader'
import { Input } from '@/components/Input'
import { INDEX_QUERY } from '@/graphql/queries'
import { getClient } from '@/services/client'

export default async function Home() {
  const { data } = await getClient().query({
    partialRefetch: true,
    query: INDEX_QUERY,
  })

  return (
    <main>
      <FullPageLoader />
      {JSON.stringify(data)}
      <div className="m-9 w-40">
        <Input error="Test" id="test" label="Test" loading />
      </div>
      <div className="m-9 w-40">
        <Button fullWidth>Button</Button>
      </div>
    </main>
  )
}
