import { Logo } from '@/newComponents/Logo'

import { GoBack } from './GoBack'

export function Header() {
  return (
    <>
      <header className="fixed top-0 z-10 flex w-full justify-between bg-white px-6 py-1 shadow-md shadow-black/5">
        <GoBack />
        <Logo />
        <div className="h-12 w-12"></div>
      </header>
      <div className="mb-4 h-14 md:mb-16"></div>
    </>
  )
}
