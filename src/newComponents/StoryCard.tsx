import { StoriesFragment } from '@/__generated__/graphql'
import { Icon } from '@/newComponents/Icon'
import { type Colors, Pill } from '@/newComponents/Pill'
import { Title } from '@/newComponents/Title'
import { UserWithDate } from '@/newComponents/UserWithDate'
import slugify from '@sindresorhus/slugify'
import Link from 'next/link'
import getReadingTime from 'reading-time'

type Props = StoriesFragment['edges'][number]

export function StoryCard({
  body,
  createdAt,
  genre,
  id,
  length,
  stats,
  title,
  user,
}: Props) {
  const hasLike = stats.likes.map(l => l.id).includes(user.id)
  const hasDislike = stats.dislikes.map(l => l.id).includes(user.id)
  const hasView = stats.views.map(l => l.id).includes(user.id)

  const readingTime = Math.ceil(getReadingTime(body).minutes)
  const getReadingTimePillColor = (): Colors => {
    if (length >= 1800 && length < 8000) return 'teal'
    if (length >= 8000 && length < 25000) return 'pink'
    return 'yellow'
  }

  return (
    <article className="relative h-[600px] overflow-hidden rounded-lg border p-6 shadow-lg shadow-black/5 md:p-8">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
        <UserWithDate
          createdAt={createdAt}
          id={user.id}
          name={user.username}
          photo={user.photo}
        />
        <div className="flex flex-wrap gap-2">
          <Pill>{genre.name}</Pill>
          <Pill color={getReadingTimePillColor()}>
            Time to read: {readingTime} min
          </Pill>
        </div>
      </div>
      <Link href={`/story/${id}-${slugify(title)}`}>
        <div className="mb-2">
          <Title level={2}>{title}</Title>
        </div>
        {body.split('\n').map((paragraph, index) =>
          paragraph ? (
            <p className="mb-2" key={index}>
              {paragraph}
            </p>
          ) : null,
        )}
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
