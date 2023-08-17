import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link
      aria-label="Go to Shortstories home page"
      className="block h-12 w-12 p-2"
      href="/"
    >
      <Image
        alt="Shortstories"
        height={32}
        src="/images/writer.svg"
        width={32}
      />
    </Link>
  )
}
