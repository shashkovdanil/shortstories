import type { LinkProps } from 'next/link'
import type { PropsWithChildren } from 'react'

import NextLink from 'next/link'

export function Link({
  children,
  ...rest
}: PropsWithChildren<Omit<LinkProps, 'className' | 'style'>>) {
  return (
    <NextLink className="text-brand focus-visible:outline-current" {...rest}>
      {children}
    </NextLink>
  )
}
