import type { PropsWithChildren } from 'react'

type Props = {
  id: string
}

export function ValidationError({ children, id }: PropsWithChildren<Props>) {
  return (
    <div className="mt-1 text-sm/none text-red-600" id={id}>
      {children}
    </div>
  )
}
