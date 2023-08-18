type Props = {
  name: string
}

export function Icon({ name }: Props) {
  return (
    <div className="flex text-4xl/none">
      <i className={name} />
    </div>
  )
}
