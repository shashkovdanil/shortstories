import { gql } from '@/__generated__/gql'

export const meFragment = gql(/* GraphQL */ `
  fragment me on Me {
    id
    username
    email
    isVerified
    photo
    info
  }
`)

export const userFragment = gql(/* GraphQL */ `
  fragment user on User {
    id
    username
    photo
    info
  }
`)

export const storyFragment = gql(/* GraphQL */ `
  fragment story on Story {
    id
    title
    body
    length
    genre {
      id
      name
    }
    user {
      ...user
    }
    stats {
      likes {
        id
      }
      dislikes {
        id
      }
      views {
        id
      }
      comments
    }
    createdAt
  }
`)

export const storiesFragment = gql(/* GraphQL */ `
  fragment stories on StoryConnection {
    edges {
      ...story
    }
    pageInfo {
      offset
      limit
    }
  }
`)

export const reactionFragment = gql(/* GraphQL */ `
  fragment reaction on Reaction {
    id
    state
    userId
    storyId
  }
`)

export const commentFragment = gql(/* GraphQL */ `
  fragment comment on Comment {
    id
    body
    commentId
    user {
      ...user
    }
    createdAt
  }
`)

export const commentsFragment = gql(/* GraphQL */ `
  fragment comment on Comment {
    id
    body
    commentId
    user {
      ...user
    }
    createdAt
  }
`)
