'use client'

import { SelectContext } from '@/newComponents/Select'
import { useListItem } from '@floating-ui/react'
import cn from 'classnames'
import { useContext } from 'react'

type Props = {
  label: string
}

export function Option({ label }: Props) {
  const { activeIndex, getItemProps, handleSelect, selectedIndex } =
    useContext(SelectContext)

  const { index, ref } = useListItem({ label })

  const isActive = activeIndex === index
  const isSelected = selectedIndex === index

  return (
    <button
      className={cn(
        'w-full rounded-md px-2 py-1 text-left transition-none focus-visible:ring-0',
        {
          'bg-brand/30 focus-visible:bg-brand/30': isActive,
          'font-medium': isSelected,
        },
      )}
      aria-selected={isActive && isSelected}
      ref={ref}
      role="option"
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {label}
    </button>
  )
}
