import { storyFragment } from '@/graphql/fragments'
import { DISLIKE_MUTATION, LIKE_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import cn from 'classnames'

import styles from './styles/reaction.module.css'

function Reaction({ active, dark, id, qty, state }) {
  function getIcon() {
    if (state === 'like') {
      return active ? '/images/icons/like-fill.svg' : '/images/icons/like.svg'
    }
    if (state === 'dislike') {
      return active
        ? '/images/icons/dislike-fill.svg'
        : '/images/icons/dislike.svg'
    }
  }
  const mutation = state === 'like' ? LIKE_MUTATION : DISLIKE_MUTATION

  const [react] = useMutation(mutation, {
    update: (cache, mutationResult) => {
      const mutationName = state === 'like' ? 'likeStory' : 'dislikeStory'
      const { userId } = mutationResult.data[mutationName]
      const story = cache.readFragment({
        fragment: storyFragment,
        fragmentName: 'story',
        id: `Story:${id}`,
      })

      const hasLike = story.stats.likes.some(l => l.id === userId)
      const hasDislike = story.stats.dislikes.some(d => d.id === userId)
      let updatedLikes = story.stats.likes
      let updatedDislikes = story.stats.dislikes

      if (state === 'like') {
        if (hasLike && !hasDislike) {
          updatedLikes = story.stats.likes.filter(l => l.id !== userId)
        }

        if (!hasLike && hasDislike) {
          updatedLikes = [
            ...story.stats.likes,
            { __typename: 'User', id: userId },
          ]
          updatedDislikes = story.stats.dislikes.filter(d => d.id !== userId)
        }

        if (!hasLike && !hasDislike) {
          updatedLikes = [
            ...story.stats.likes,
            { __typename: 'User', id: userId },
          ]
        }

        cache.writeFragment({
          data: {
            ...story,
            stats: {
              ...story.stats,
              dislikes: updatedDislikes,
              likes: updatedLikes,
            },
          },
          fragment: storyFragment,
          fragmentName: 'story',
          id: `Story:${id}`,
        })
        return
      }

      if (hasDislike && !hasLike) {
        updatedDislikes = story.stats.dislikes.filter(l => l.id !== userId)
      }

      if (!hasDislike && hasLike) {
        updatedDislikes = [
          ...story.stats.dislikes,
          { __typename: 'User', id: userId },
        ]
        updatedLikes = story.stats.likes.filter(l => l.id !== userId)
      }

      if (!hasDislike && !hasLike) {
        updatedDislikes = [
          ...story.stats.dislikes,
          { __typename: 'User', id: userId },
        ]
      }

      cache.writeFragment({
        data: {
          ...story,
          stats: {
            ...story.stats,
            dislikes: updatedDislikes,
            likes: updatedLikes,
          },
        },
        fragment: storyFragment,
        fragmentName: 'story',
        id: `Story:${id}`,
      })
    },
    variables: { id },
  })

  return (
    <div className={cn(styles['reaction-button'], { [styles.dark]: dark })}>
      <button onClick={react} type="button">
        <img alt={state} src={getIcon()} />
      </button>
      <span>{qty}</span>
    </div>
  )
}

export default Reaction
