import type { PropsWithChildren } from 'react'

export default function ConfirmLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div></div>
      <section className="mx-auto grid max-w-md items-center">
        {children}
      </section>
      <div></div>
    </>
  )
}
