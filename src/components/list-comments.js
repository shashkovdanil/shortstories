import cn from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import { groupBy } from 'ramda'
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Button, ErrorMessage, UserWithDate } from '.'
import { commentFragment, storyFragment } from '../lib/fragments'
import {
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
} from '../lib/mutations'
import { STORY_QUERY } from '../lib/queries'
import styles from './styles/comments.css'

function editUpdate(cache, payload, id) {
  cache.writeFragment({
    data: payload.data.updateComment,
    fragment: commentFragment,
    fragmentName: 'comment',
    id: `Comment:${id}`,
  })
}

function deleteUpdate(cache, payload, id, hasChildren, parentId) {
  const data = cache.readQuery({ query: STORY_QUERY, variables: { id } })
  const story = cache.readFragment({
    fragment: storyFragment,
    fragmentName: 'story',
    id: `Story:${id}`,
  })

  if (parentId) {
    const parentComment = data.comments.find(comment => comment.id === parentId)

    if (parentComment.body === null) {
      data.comments = data.comments.filter(
        comment =>
          comment.id !== payload.data.deleteComment.id &&
          comment.id !== parentComment.id,
      )
    }
  }

  if (!hasChildren) {
    data.comments = data.comments.filter(
      comment => comment.id !== payload.data.deleteComment.id,
    )
  } else {
    data.comments = data.comments.map(comment => {
      if (comment.id === payload.data.deleteComment.id) {
        return {
          ...comment,
          body: null,
        }
      }
      return comment
    })
  }

  cache.writeQuery({
    data,
    query: STORY_QUERY,
    variables: { id },
  })

  cache.writeFragment({
    data: {
      ...story,
      stats: {
        ...story.stats,
        comments: story.stats.comments - 1,
      },
    },
    fragment: storyFragment,
    fragmentName: 'story',
    id: `Story:${id}`,
  })
}

function CommentEditor({
  comment,
  commentBody,
  isDarkMode,
  me,
  onChange,
  resetAfterUpdate,
}) {
  return (
    <Mutation
      optimisticResponse={{
        __typename: 'Mutation',
        updateComment: {
          __typename: 'Comment',
          body: commentBody,
          createdAt: new Date().toISOString(),
          id: comment.id,
          user: {
            __typename: 'User',
            id: me.id,
            info: me.info,
            photo: me.photo,
            username: me.username,
          },
        },
      }}
      mutation={UPDATE_COMMENT_MUTATION}
      update={(cache, payload) => editUpdate(cache, payload, comment.id)}
      variables={{ body: commentBody, id: comment.id }}
    >
      {(updateComment, { error, loading }) => (
        <div className={styles['edit-comment']}>
          <ErrorMessage error={error} />
          <ReactTextareaAutosize
            className={cn({ [styles.dark]: isDarkMode })}
            id={comment.id}
            maxLength={255}
            name="comment"
            onChange={onChange}
            placeholder="Измените комментарий..."
            value={commentBody}
          />
          <Button
            onClick={async () => {
              await updateComment()
              resetAfterUpdate()
            }}
            black
            disabled={commentBody.length === 0}
            loading={loading}
          >
            Редактировать
          </Button>
        </div>
      )}
    </Mutation>
  )
}

function ListComments({
  activateEditMode,
  commentBody,
  comments,
  editId,
  isDarkMode,
  me,
  onChange,
  resetAfterUpdate,
  storyId,
}) {
  const [replyCommentId, setReplyCommentId] = useState(null)
  const [replyCommentBody, setReplyCommentBody] = useState('')
  const byCommentId = groupBy(comment => comment.commentId)
  const groupedComments = byCommentId(comments)
  const parentComments = groupedComments['null']

  const recurComments = (array = parentComments, id, parentId) => {
    const isParent = !(id && id !== parentId)
    const commentsArray = isParent ? array : groupedComments[id]

    if (!Array.isArray(commentsArray)) return null

    return (
      <ul
        className={cn(styles['list-comments'], {
          [styles['parent-comments']]: isParent,
        })}
      >
        {commentsArray.map(comment =>
          me && editId === comment.id ? (
            <CommentEditor
              comment={comment}
              commentBody={commentBody}
              isDarkMode={isDarkMode}
              key={`comment-editor-${comment.id}`}
              me={me}
              onChange={onChange}
              resetAfterUpdate={resetAfterUpdate}
            />
          ) : (
            <li className={cn({ [styles.dark]: isDarkMode })} key={comment.id}>
              <div className={styles['comment-header']}>
                <UserWithDate
                  className={styles['user-and-date']}
                  date={comment.createdAt}
                  user={comment.user}
                />
                {me.id === comment.user.id && comment.body !== null && (
                  <div className={styles['edit-and-delete']}>
                    <button
                      onClick={() => {
                        activateEditMode(comment)
                      }}
                      className={cn({ [styles.dark]: isDarkMode })}
                      type="button"
                    >
                      <img
                        src={
                          isDarkMode
                            ? '/icons/dark/edit.svg'
                            : '/icons/light/edit.svg'
                        }
                        alt="Редактировать"
                      />
                    </button>
                    <Mutation
                      optimisticResponse={{
                        __typename: 'Mutation',
                        deleteComment: {
                          __typename: 'Comment',
                          id: comment.id,
                        },
                      }}
                      update={(cache, payload) =>
                        deleteUpdate(
                          cache,
                          payload,
                          storyId,
                          !!groupedComments[comment.id],
                          comment.commentId,
                        )
                      }
                      variables={{
                        commentId: comment.commentId,
                        hasChildren: !!groupedComments[comment.id],
                        id: comment.id,
                      }}
                      mutation={DELETE_COMMENT_MUTATION}
                    >
                      {deleteComment => (
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            deleteComment()
                          }}
                          className={cn({ [styles.dark]: isDarkMode })}
                          type="button"
                        >
                          <img
                            src={
                              isDarkMode
                                ? '/icons/dark/cross.svg'
                                : '/icons/light/cross.svg'
                            }
                            alt="Удалить"
                          />
                        </button>
                      )}
                    </Mutation>
                  </div>
                )}
              </div>
              <p className={styles.body}>
                {comment.body === null
                  ? 'Комментарий удалён автором'
                  : comment.body}
              </p>
              {replyCommentId && replyCommentId === comment.id ? (
                <Mutation
                  optimisticResponse={{
                    __typename: 'Mutation',
                    createComment: {
                      __typename: 'Comment',
                      body: replyCommentBody,
                      commentId: comment.id,
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
                  }}
                  update={(cache, mutationResult) => {
                    const storyQuery = cache.readQuery({
                      query: STORY_QUERY,
                      variables: { id: storyId },
                    })
                    const story = cache.readFragment({
                      fragment: storyFragment,
                      fragmentName: 'story',
                      id: `Story:${storyId}`,
                    })

                    storyQuery.comments = [
                      ...storyQuery.comments,
                      mutationResult.data.createComment,
                    ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))

                    cache.writeQuery({
                      data: storyQuery,
                      query: STORY_QUERY,
                      variables: { id: storyId },
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
                      id: `Story:${storyId}`,
                    })
                  }}
                  variables={{
                    body: replyCommentBody,
                    commentId: comment.id,
                    id: storyId,
                  }}
                  mutation={CREATE_COMMENT_MUTATION}
                >
                  {createComment => (
                    <div className={styles['reply-section']}>
                      <ReactTextareaAutosize
                        onChange={e => {
                          setReplyCommentBody(e.target.value)
                        }}
                        autoFocus
                        className={styles['reply-textarea']}
                        maxLength={255}
                        placeholder="Напишите ответ..."
                        value={replyCommentBody}
                      />
                      <div className={styles['reply-buttons']}>
                        <Button
                          onClick={async () => {
                            await createComment()
                            setReplyCommentBody('')
                            setReplyCommentId(null)
                          }}
                          disabled={replyCommentBody.length === 0}
                          violet
                        >
                          Ответить
                        </Button>
                        <button
                          onClick={() => {
                            setReplyCommentId(null)
                          }}
                          className={styles['cancel-button']}
                          type="button"
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  )}
                </Mutation>
              ) : +me.id > 0 && comment.body !== null ? (
                <button
                  onClick={() => {
                    if (replyCommentId !== null) setReplyCommentId(null)
                    setReplyCommentId(comment.id)
                  }}
                  className={styles.reply}
                  type="button"
                >
                  Ответить
                </button>
              ) : null}
              {recurComments(
                groupedComments[comment.commentId],
                comment.id,
                comment.commentId,
              )}
            </li>
          ),
        )}
      </ul>
    )
  }

  return parentComments && parentComments.length ? (
    recurComments()
  ) : (
    <p
      className={cn(styles['no-comments'], {
        [styles.dark]: isDarkMode,
      })}
    >
      Пока что нет комментариев
    </p>
  )
}

export default ListComments
