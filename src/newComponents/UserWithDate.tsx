import { getRandomColorFromId } from '@/shared/utils/getRandomColorFromId'
import format from 'date-fns/format'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  createdAt: string
  id: number
  name: string
  photo?: string
}

export function UserWithDate({ createdAt, id, name, photo }: Props) {
  return (
    <Link className="flex w-fit items-center gap-3" href={`/users/${id}`}>
      {photo ? (
        <Image alt={name} height={48} src={photo} width={48} />
      ) : (
        <div
          style={{
            backgroundColor: getRandomColorFromId(id.toString()),
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl/none font-black text-white"
        >
          <span>{name.at(0).toUpperCase()}</span>
        </div>
      )}
      <div>
        <div className="font-medium text-brand">{name}</div>
        <div className="text-sm text-slate-500">
          {format(new Date(createdAt), 'MMM d, yyyy')}
        </div>
      </div>
    </Link>
  )
}
