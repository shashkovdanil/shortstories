import { storyFragment } from '@/graphql/fragments'
import { DISLIKE_MUTATION, LIKE_MUTATION } from '@/graphql/mutations'
import cn from 'classnames'
import React from 'react'

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

  const handleReaction = () => {}

  return (
    <div className={cn(styles['reaction-button'], { [styles.dark]: dark })}>
      <button onClick={handleReaction} type="button">
        <img alt={state} src={getIcon()} />
      </button>
      <span>{qty}</span>
    </div>
  )
}

export default Reaction
