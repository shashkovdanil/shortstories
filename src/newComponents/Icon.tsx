import cn from 'classnames'

type Props = {
  name: string
  size?: 'lg' | 'md' | 'sm'
}

export function Icon({ name, size = 'md' }: Props) {
  return (
    <div
      className={cn('flex ', {
        'text-2xl/none': size === 'sm',
        'text-4xl/none': size === 'md',
        'text-6xl/none': size === 'lg',
      })}
    >
      <i className={name} />
    </div>
  )
}
