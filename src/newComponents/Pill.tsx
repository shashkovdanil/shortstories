import type { PropsWithChildren } from 'react'

import cn from 'classnames'

export type Colors = 'pink' | 'purple' | 'teal' | 'yellow'

const colorsMap: Record<Colors, string> = {
  pink: 'bg-pink-400',
  purple: 'bg-brand',
  teal: 'bg-teal-500',
  yellow: 'bg-yellow-300',
}

type Props = {
  color?: Colors
}

export function Pill({ children, color = 'purple' }: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-3xl px-4 py-2 text-sm/none font-medium text-white',
        colorsMap[color],
        {
          'text-black': color === 'yellow',
        },
      )}
    >
      {children}
    </div>
  )
}
