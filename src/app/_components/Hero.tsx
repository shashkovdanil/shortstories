import { Link } from '@/newComponents/Link'
import { Title } from '@/newComponents/Title'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="mb-4 bg-background py-4 md:mb-12 md:py-12">
      <div className="mx-auto flex max-w-5xl px-6">
        <div className="flex flex-col gap-6">
          <Title level={1}>
            Here you can read short stories by freelance writers
          </Title>
          <p className="text-balance">
            Discover new authors or{' '}
            <Link href="/story-editor">showcase your talent</Link>
          </p>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <Link aria-label="Go to Write Story page" href="/story-editor">
            <Image
              alt="Write Story"
              height={100}
              src="/images/writer.svg"
              width={100}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
