import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

import cn from 'classnames'

type Attributes = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

type Levels = 1 | 2 | 3 | 4 | 5 | 6

type Props = {
  level: Levels
} & Omit<Attributes, 'className' | 'style'>

export function Title({ children, level, ...rest }: PropsWithChildren<Props>) {
  const Tag = `h${level}` as const

  return (
    <Tag
      className={cn('text-balance font-bold', {
        'text-4xl md:text-5xl/tight': level === 1,
        'text-base': level === 4,
        'text-lg': level === 3,
        'text-sm': level === 5,
        'text-xl': level === 2,
        'text-xs': level === 6,
      })}
      {...rest}
    >
      {children}
    </Tag>
  )
}
