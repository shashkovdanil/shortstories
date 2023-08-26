'use client'

import { Icon } from '@/newComponents/Icon'
import { useRouter } from 'next/navigation'

export function GoBack() {
  const { back } = useRouter()

  return (
    <button
      onClick={() => {
        back()
      }}
      aria-label="Go back"
      className="flex h-12 w-12 items-center justify-center"
      type="button"
    >
      <Icon name="ri-arrow-left-line" />
    </button>
  )
}
