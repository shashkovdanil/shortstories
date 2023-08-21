import { StoriesFragment } from '@/__generated__/graphql'
import { Icon } from '@/newComponents/Icon'
import { Title } from '@/newComponents/Title'
import { getRandomColorFromId } from '@/shared/utils/getRandomColorFromId'
import slugify from '@sindresorhus/slugify'
import format from 'date-fns/format'
import Image from 'next/image'
import Link from 'next/link'
import readingTime from 'reading-time'

type Props = StoriesFragment['edges'][number]

export function StoryCard({
  body,
  createdAt,
  genre,
  id,
  stats,
  title,
  user,
}: Props) {
  const hasLike = stats.likes.map(l => l.id).includes(user.id)
  const hasDislike = stats.dislikes.map(l => l.id).includes(user.id)
  const hasView = stats.views.map(l => l.id).includes(user.id)

  return (
    <article className="relative h-[600px] overflow-hidden rounded-lg border p-6 drop-shadow-lg md:p-8">
      <div className="mb-3">
        <Link
          className="flex w-fit items-center gap-3"
          href={`/users/${user.id}`}
        >
          {user.photo ? (
            <Image
              alt={user.username}
              height={48}
              src={user.photo}
              width={48}
            />
          ) : (
            <div
              style={{
                backgroundColor: getRandomColorFromId(user.id.toString()),
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full text-2xl/none font-black text-white"
            >
              <span>{user.username.at(0).toUpperCase()}</span>
            </div>
          )}
          <div>
            <div className="font-medium text-brand">{user.username}</div>
            <div className="text-sm text-slate-500">
              {format(new Date(createdAt), 'MMM d, yyyy')}
            </div>
          </div>
        </Link>
      </div>
      <Link href={`/story/${id}-${slugify(title)}`}>
        <Title level={2}>{title}</Title>
        <div>
          <span>{genre.name}</span>
          <span>Time to read {Math.ceil(readingTime(body).minutes)} min</span>
        </div>
        {body
          .split('\n')
          .filter(paragraph => paragraph !== '')
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(_hsla(0,0%,100%,0),hsla(0,0%,100%,0.95),#fff_)] pl-5 pr-5 pt-16">
          <div className="mb-5 flex justify-end gap-4">
            <div className="flex flex-col items-center justify-center">
              <Icon name={hasView ? 'ri-eye-fill' : 'ri-eye-line'} size="sm" />
              <span className="font-bold text-slate-600">
                {stats.views.length}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Icon
                name={hasLike ? 'ri-heart-fill' : 'ri-heart-line'}
                size="sm"
              />
              <span className="font-bold text-slate-600">
                {stats.likes.length}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Icon
                name={hasDislike ? 'ri-dislike-fill' : 'ri-dislike-line'}
                size="sm"
              />
              <span className="font-bold text-slate-600">
                {stats.dislikes.length}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Icon name="ri-chat-1-line" size="sm" />
              <span className="font-bold text-slate-600">{stats.comments}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
