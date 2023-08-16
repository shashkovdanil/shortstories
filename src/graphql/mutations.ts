import { gql } from '@/__generated__/gql'

export const UPDATE_ACCOUNT_MUTATION = gql(/* GraphQL */ `
  mutation UPDATE_ACCOUNT_MUTATION($username: String!, $info: String) {
    updateUser(username: $username, info: $info) {
      ...me
    }
  }
`)

export const POST_PHOTO_MUTATION = gql(/* GraphQL */ `
  mutation POST_PHOTO_MUTATION(
    $file: Upload!
    $width: Float!
    $height: Float!
    $x: Float!
    $y: Float!
  ) {
    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {
      photo
    }
  }
`)

export const CHECK_USER_EXIST_MUTATION = gql(/* GraphQL */ `
  mutation CHECK_USER_EXIST_MUTATION($login: String!) {
    checkUserExists(login: $login)
  }
`)

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      ...me
    }
  }
`)

export const SEND_MAGIC_LINK_MUTATION = gql(/* GraphQL */ `
  mutation SEND_MAGIC_LINK_MUTATION($email: String!) {
    sendMagicLink(email: $email) {
      message
    }
  }
`)

export const MAGIC_LINK_MUTATION_AUTH = gql(/* GraphQL */ `
  mutation MAGIC_LINK_MUTATION_AUTH($token: String!) {
    magicLinkAuth(token: $token) {
      ...me
    }
  }
`)

export const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SIGN_UP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(username: $username, email: $email, password: $password) {
      ...me
    }
  }
`)

// Запрос сброса пароля
export const REQUEST_RESET_MUTATION = gql(/* GraphQL */ `
  mutation REQUEST_RESET_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
  }
`)

// Сброс пароля
export const RESET_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation RESET_PASSWORD_MUTATION(
    $token: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      ...me
    }
  }
`)

export const VERIFY_MUTATION = gql(/* GraphQL */ `
  mutation VERIFY_MUTATION($token: String!) {
    verifyUser(token: $token) {
      ...me
    }
  }
`)

export const SIGN_OUT_MUTATION = gql(/* GraphQL */ `
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`)

export const LIKE_MUTATION = gql(/* GraphQL */ `
  mutation LIKE_MUTATION($id: Int!) {
    likeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`)

export const DISLIKE_MUTATION = gql(/* GraphQL */ `
  mutation DISLIKE_MUTATION($id: Int!) {
    dislikeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`)

export const CREATE_STORY_MUTATION = gql(/* GraphQL */ `
  mutation CREATE_STORY_MUTATION(
    $title: String!
    $body: String!
    $genreId: Int!
  ) {
    createStory(title: $title, body: $body, genreId: $genreId) {
      ...story
    }
  }
`)

export const EDIT_STORY_MUTATION = gql(/* GraphQL */ `
  mutation EDIT_STORY_MUTATION(
    $id: Int!
    $body: String!
    $title: String!
    $genreId: Int!
  ) {
    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {
      id
      title
      body
    }
  }
`)

export const DELETE_STORY_MUTATION = gql(/* GraphQL */ `
  mutation DELETE_STORY_MUTATION($id: Int!) {
    deleteStory(id: $id) {
      id
    }
  }
`)

export const VIEW_STORY_MUTATION = gql(/* GraphQL */ `
  mutation VIEW_STORY_MUTATION($id: Int!) {
    viewStory(id: $id) {
      id
      userId
      storyId
    }
  }
`)

export const CREATE_COMMENT_MUTATION = gql(/* GraphQL */ `
  mutation CREATE_COMMENT_MUTATION($id: Int!, $body: String!, $commentId: Int) {
    createComment(id: $id, body: $body, commentId: $commentId) {
      ...comment
    }
  }
`)

export const DELETE_COMMENT_MUTATION = gql(/* GraphQL */ `
  mutation DELETE_COMMENT_MUTATION(
    $id: Int!
    $hasChildren: Boolean!
    $commentId: Int
  ) {
    deleteComment(id: $id, hasChildren: $hasChildren, commentId: $commentId) {
      id
    }
  }
`)

export const UPDATE_COMMENT_MUTATION = gql(/* GraphQL */ `
  mutation UPDATE_COMMENT_MUTATION($id: Int!, $body: String!) {
    updateComment(id: $id, body: $body) {
      ...comment
    }
  }
`)
