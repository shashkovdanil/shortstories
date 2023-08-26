import { Logo } from '@/newComponents/Logo'

import { GoBack } from './GoBack'

export function Header() {
  return (
    <>
      <header className="fixed top-0 flex w-full justify-between py-1 shadow-md shadow-black/5">
        <GoBack />
        <Logo />
        <div className="h-12 w-12"></div>
      </header>
      <div className="mb-16 h-14"></div>
    </>
  )
}
