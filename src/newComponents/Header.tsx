import { Navigation } from '@/newComponents/Navigation'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex items-center bg-background py-4">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_1fr] items-center justify-between px-6">
        <Link href="/">
          <Image
            alt="Shortstories Logo"
            height={48}
            src="/images/logo.svg"
            width={48}
          />
        </Link>
        <Navigation />
      </div>
    </header>
  )
}
