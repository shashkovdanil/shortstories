'use client'

import { CREATE_STORY_MUTATION } from '@/graphql/mutations'
import { CREATE_STORY_QUERY, ME_QUERY, USER_QUERY } from '@/graphql/queries'
import { Button } from '@/newComponents/Button'
import { Option } from '@/newComponents/Option'
import { Select } from '@/newComponents/Select'
import { Textarea } from '@/newComponents/Textarea'
import { ValidationError } from '@/newComponents/ValidationError'
import { useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, useForm } from 'react-hook-form'
import { maxLength, minLength, object, string } from 'valibot'

const schema = object({
  body: string([
    minLength(1500, 'Too short a story (min length 1,500 symbols)'),
    maxLength(40000, 'Too long a story (max length 40,000 symbols)'),
  ]),
  genre: string('Genre is required'),
  title: string([minLength(1, 'Title is required')]),
})

export function Form() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<typeof schema.types.output>({
    resolver: valibotResolver(schema),
  })

  const {
    data: {
      genres,
      me: { id },
    },
  } = useSuspenseQuery(CREATE_STORY_QUERY, {
    fetchPolicy: 'cache-first',
  })

  const [createStory, { error, loading }] = useMutation(CREATE_STORY_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: USER_QUERY,
        variables: { id },
      },
      {
        query: ME_QUERY,
        variables: { userId: id },
      },
    ],
  })

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
      className="flex flex-col items-start gap-3 md:gap-6"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="w-full">
        <input
          {...register('title')}
          aria-describedby="title-error"
          aria-invalid={Boolean(errors.title)}
          className="w-full rounded-md border-2 px-4 py-2 text-3xl focus-visible:border-brand focus-visible:outline-none md:text-4xl"
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
              className="rounded-md border-2 px-4 py-2"
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
          className="w-full rounded-md border-2 px-4 py-2 text-xl focus-visible:border-brand focus-visible:outline-none md:text-2xl"
          placeholder="Tell your story..."
          rows={10}
        />
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
