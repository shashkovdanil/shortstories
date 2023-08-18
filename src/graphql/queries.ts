import { gql } from '@/__generated__/gql'

export const ONLY_ME_QUERY = gql(/* GraphQL */ `
  query ONLY_ME_QUERY {
    me {
      ...me
    }
  }
`)

export const INDEX_QUERY = gql(/* GraphQL */ `
  query INDEX_QUERY(
    $offset: Int = 0
    $limit: Int = 8
    $userId: Int = null
    $isLiked: Boolean = false
    $length: String
    $genres: [Int]
    $mostLiked: Boolean = false
    $mostViewed: Boolean = false
    $mostCommented: Boolean = false
  ) {
    me {
      ...me
    }

    stories(
      offset: $offset
      limit: $limit
      userId: $userId
      isLiked: $isLiked
      length: $length
      genres: $genres
      mostLiked: $mostLiked
      mostViewed: $mostViewed
      mostCommented: $mostCommented
    )
      @connection(
        key: "IndexStoriesConnection"
        filter: ["length", "genres", "mostLiked", "mostViewed", "mostCommented"]
      ) {
      ...stories
    }

    genres {
      id
      name
    }
  }
`)

export const ME_QUERY = gql(/* GraphQL */ `
  query ME_QUERY($offset: Int = 0, $limit: Int = 8, $userId: Int) {
    me {
      ...me
    }

    writtenStories: stories(
      offset: $offset
      limit: $limit
      userId: $userId
      isLiked: false
    )
      @connection(
        key: "WrittenStoriesConnection"
        filter: ["userId", "isLiked"]
      ) {
      ...stories
    }

    favStories: stories(offset: $offset, limit: $limit, isLiked: true)
      @connection(key: "LikedStoriesConnection", filter: ["isLiked"]) {
      ...stories
    }
  }
`)

export const EDIT_STORY_QUERY = gql(/* GraphQL */ `
  query EDIT_STORY_QUERY($id: Int!) {
    story(id: $id) {
      ...story
    }

    genres {
      id
      name
    }
  }
`)

export const USER_QUERY = gql(/* GraphQL */ `
  query USER_QUERY($id: Int!, $offset: Int = 0, $limit: Int = 8) {
    me {
      ...me
    }

    user(id: $id) {
      ...user
    }

    stories(offset: $offset, limit: $limit, userId: $id)
      @connection(key: "UserStoriesConnection", filter: ["userId"]) {
      ...stories
    }
  }
`)

export const STORY_QUERY = gql(/* GraphQL */ `
  query STORY_QUERY($id: Int!) {
    me {
      ...me
    }

    story(id: $id) {
      ...story
    }

    comments(storyId: $id) {
      ...comment
    }
  }
`)

export const GENRES_QUERY = gql(/* GraphQL */ `
  query GENRES_QUERY {
    genres {
      id
      name
    }
  }
`)

export const CHECK_LOGGED_IN_QUERY = gql(/* GraphQL */ `
  query CHECK_LOGGED_IN_QUERY {
    me {
      ...me
    }
  }
`)

export const HOME_PAGE_QUERY = gql(/* GraphQL */ `
  query HOME_PAGE_QUERY($offset: Int = 0, $limit: Int = 8) {
    me {
      ...me
    }

    stories(offset: $offset, limit: $limit) {
      ...stories
    }
  }
`)
