import { storyFragment } from '@/graphql/fragments'
import { CREATE_COMMENT_MUTATION } from '@/graphql/mutations'
import { STORY_QUERY } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import cn from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import React, { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Button, ErrorMessage } from '.'
import ListComments from './list-comments'
import styles from './styles/comments.module.css'

function Comments({ comments, id, isDarkMode, me }) {
  const [body, setBody] = useState('')
  const [editId, setEditId] = useState(null)
  const [commentBody, setCommentBody] = useState('')

  const [createComment, { error, loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      optimisticResponse: {
        __typename: 'Mutation',
        createComment: {
          __typename: 'Comment',
          body,
          commentId: null,
          createdAt: new Date().toISOString(),
          id: nanoid(10),
          user: {
            __typename: 'User',
            id: me.id,
            info: me.info,
            photo: me.photo,
            username: me.username,
          },
        },
      },
      update: (cache, mutationResult) => {
        const storyQuery = cache.readQuery({
          query: STORY_QUERY,
          variables: { id },
        })
        const story = cache.readFragment({
          fragment: storyFragment,
          fragmentName: 'story',
          id: `Story:${id}`,
        })

        storyQuery.comments = [
          ...storyQuery.comments,
          mutationResult.data.createComment,
        ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))

        cache.writeQuery({
          data: storyQuery,
          query: STORY_QUERY,
          variables: { id },
        })

        cache.writeFragment({
          data: {
            ...story,
            stats: {
              ...story.stats,
              comments: story.stats.comments + 1,
            },
          },
          fragment: storyFragment,
          fragmentName: 'story',
          id: `Story:${id}`,
        })
      },
      variables: { body, id },
    },
  )

  return (
    <div className={styles.comments}>
      {me && (
        <div className={styles['create-comment']}>
          <ErrorMessage error={error} />
          <ReactTextareaAutosize
            onChange={e => {
              setBody(e.target.value)
            }}
            className={cn({ [styles.dark]: isDarkMode })}
            id="body"
            maxLength={255}
            name="body"
            placeholder="Оставьте комментарий..."
            value={body}
          />
          <Button
            onClick={async () => {
              await createComment()
              setBody('')
            }}
            black
            disabled={body.length === 0}
            loading={loading}
          >
            Написать
          </Button>
        </div>
      )}
      <ListComments
        activateEditMode={comment => {
          setEditId(comment.id)
          setCommentBody(comment.body)
        }}
        onChange={e => {
          setCommentBody(e.target.value)
        }}
        resetAfterUpdate={() => {
          setEditId(null)
          setCommentBody('')
        }}
        commentBody={commentBody}
        comments={comments}
        editId={editId}
        isDarkMode={isDarkMode}
        me={me}
        storyId={id}
      />
    </div>
  )
}

export default Comments
