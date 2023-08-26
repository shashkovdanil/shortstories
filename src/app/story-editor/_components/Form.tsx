'use client'

import { Genre } from '@/__generated__/graphql'
import { CREATE_STORY_MUTATION } from '@/graphql/mutations'
import { ME_QUERY, USER_QUERY } from '@/graphql/queries'
import { Button } from '@/newComponents/Button'
import { Option } from '@/newComponents/Option'
import { Select } from '@/newComponents/Select'
import { Textarea } from '@/newComponents/Textarea'
import { ValidationError } from '@/newComponents/ValidationError'
import { useMutation } from '@apollo/client'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, useForm } from 'react-hook-form'
import { maxLength, minLength, object, string } from 'valibot'

type Props = {
  genres: Genre[]
  meId: number
}

const schema = object({
  body: string([
    minLength(1800, 'Too short a story (min length 1,800 symbols)'),
    maxLength(40000, 'Too long a story (max length 40,000 symbols)'),
  ]),
  genre: string('Genre is required'),
  title: string([minLength(1, 'Title is required')]),
})

export function Form({ genres, meId }: Props) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<typeof schema.types.output>({
    resolver: valibotResolver(schema),
  })

  const [createStory, { error, loading }] = useMutation(CREATE_STORY_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: USER_QUERY,
        variables: { id: meId },
      },
      {
        query: ME_QUERY,
        variables: { userId: meId },
      },
    ],
  })

  const body = watch('body')

  const onSubmit = handleSubmit(
    ({ body, genre, title }: typeof schema.types.output) => {
      createStory({
        variables: {
          body,
          genreId: genres.find(({ name }) => name === genre).id,
          title,
        },
      })
    },
  )

  return (
    <form
      className="flex flex-col items-start gap-6"
      noValidate
      onSubmit={onSubmit}
    >
      <div>
        <input
          {...register('title')}
          aria-describedby="title-error"
          aria-invalid={Boolean(errors.title)}
          className="w-full text-5xl focus-visible:outline-none"
          placeholder="Title..."
        />
        {errors.title && (
          <ValidationError id="title-error">
            {errors.title.message}
          </ValidationError>
        )}
      </div>
      <div>
        <Controller
          render={({ field }) => (
            <Select
              placeholder="Click to select genre"
              {...field}
              aria-describedby="genre-error"
            >
              {genres.map(genre => (
                <Option key={genre.id} label={genre.name} />
              ))}
            </Select>
          )}
          control={control}
          name="genre"
        />
        {errors.genre && (
          <ValidationError id="genre-error">
            {errors.genre.message}
          </ValidationError>
        )}
      </div>
      <div className="w-full">
        <Textarea
          {...register('body')}
          aria-describedby="body-error"
          aria-invalid={Boolean(errors.body)}
          className="w-full text-3xl"
          placeholder="Tell your story..."
        />
        <div>{body.length}</div>
        {errors.body && (
          <ValidationError id="body-error">
            {errors.body.message}
          </ValidationError>
        )}
      </div>
      <Button full loading={loading} type="submit">
        Publish
      </Button>
    </form>
  )
}
