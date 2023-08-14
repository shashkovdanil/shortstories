import React from 'react'

import Button from './button'
import ItemStories from './item-stories'
import styles from './styles/list-stories.css'

function loadMoreStories(fetchMore, offset) {
  fetchMore({
    updateQuery: (previousResult, { fetchMoreResult }) =>
      !fetchMoreResult
        ? previousResult
        : {
            stories: {
              ...fetchMoreResult.stories,
              edges: [
                ...previousResult.stories.edges,
                ...fetchMoreResult.stories.edges,
              ],
            },
          },
    variables: { offset },
  })
}

function ListStories({ edges, fetchMore, me, pageInfo, userId }) {
  return (
    <>
      <div className={styles.list}>
        {edges.map(story => (
          <ItemStories
            isStoryOwner={userId === story.user.id}
            key={story.id}
            me={me}
            {...story}
          />
        ))}
      </div>
      {edges.length === pageInfo.limit + pageInfo.offset && (
        <Button
          onClick={() => {
            loadMoreStories(fetchMore, edges.length)
          }}
          black
          className={styles['load-more-button']}
        >
          Далее
        </Button>
      )}
    </>
  )
}

export default ListStories
