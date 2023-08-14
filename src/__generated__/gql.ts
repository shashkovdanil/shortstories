/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment me on Me {\n    id\n    username\n    email\n    isVerified\n    photo\n    info\n  }\n": types.MeFragmentDoc,
    "\n  fragment user on User {\n    id\n    username\n    photo\n    info\n  }\n": types.UserFragmentDoc,
    "\n  fragment story on Story {\n    id\n    title\n    body\n    length\n    genre {\n      id\n      name\n    }\n    user {\n      ...user\n    }\n    stats {\n      likes {\n        id\n      }\n      dislikes {\n        id\n      }\n      views {\n        id\n      }\n      comments\n    }\n    createdAt\n  }\n": types.StoryFragmentDoc,
    "\n  fragment stories on StoryConnection {\n    edges {\n      ...story\n    }\n    pageInfo {\n      offset\n      limit\n    }\n  }\n": types.StoriesFragmentDoc,
    "\n  fragment reaction on Reaction {\n    id\n    state\n    userId\n    storyId\n  }\n": types.ReactionFragmentDoc,
    "\n  fragment comment on Comment {\n    id\n    body\n    commentId\n    user {\n      ...user\n    }\n    createdAt\n  }\n": types.CommentFragmentDoc,
    "\n  mutation UPDATE_ACCOUNT_MUTATION($username: String!, $info: String) {\n    updateUser(username: $username, info: $info) {\n      ...me\n    }\n  }\n\n  \n": types.Update_Account_MutationDocument,
    "\n  mutation POST_PHOTO_MUTATION(\n    $file: Upload!\n    $width: Float!\n    $height: Float!\n    $x: Float!\n    $y: Float!\n  ) {\n    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {\n      photo\n    }\n  }\n": types.Post_Photo_MutationDocument,
    "\n  mutation CHECK_USER_EXIST_MUTATION($login: String!) {\n    checkUserExists(login: $login)\n  }\n": types.Check_User_Exist_MutationDocument,
    "\n  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      ...me\n    }\n  }\n\n  \n": types.Sign_In_MutationDocument,
    "\n  mutation SIGN_UP_MUTATION(\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(username: $username, email: $email, password: $password) {\n      ...me\n    }\n  }\n\n  \n": types.Sign_Up_MutationDocument,
    "\n  mutation REQUEST_RESET_MUTATION($login: String!) {\n    requestReset(login: $login) {\n      email\n    }\n  }\n": types.Request_Reset_MutationDocument,
    "\n  mutation RESET_PASSWORD_MUTATION(\n    $token: String!\n    $password: String!\n    $passwordConfirmation: String!\n  ) {\n    resetPassword(\n      token: $token\n      password: $password\n      passwordConfirmation: $passwordConfirmation\n    ) {\n      ...me\n    }\n  }\n\n  \n": types.Reset_Password_MutationDocument,
    "\n  mutation VERIFY_MUTATION($token: String!) {\n    verifyUser(token: $token) {\n      ...me\n    }\n  }\n\n  \n": types.Verify_MutationDocument,
    "\n  mutation SIGN_OUT_MUTATION {\n    signOut {\n      message\n    }\n  }\n": types.Sign_Out_MutationDocument,
    "\n  mutation LIKE_MUTATION($id: Int!) {\n    likeStory(id: $id) {\n      id\n      state\n      userId\n      storyId\n    }\n  }\n": types.Like_MutationDocument,
    "\n  mutation DISLIKE_MUTATION($id: Int!) {\n    dislikeStory(id: $id) {\n      id\n      state\n      userId\n      storyId\n    }\n  }\n": types.Dislike_MutationDocument,
    "\n  mutation CREATE_STORY_MUTATION(\n    $title: String!\n    $body: String!\n    $genreId: Int!\n  ) {\n    createStory(title: $title, body: $body, genreId: $genreId) {\n      ...story\n    }\n  }\n\n  \n": types.Create_Story_MutationDocument,
    "\n  mutation EDIT_STORY_MUTATION(\n    $id: Int!\n    $body: String!\n    $title: String!\n    $genreId: Int!\n  ) {\n    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {\n      id\n      title\n      body\n    }\n  }\n": types.Edit_Story_MutationDocument,
    "\n  mutation DELETE_STORY_MUTATION($id: Int!) {\n    deleteStory(id: $id) {\n      id\n    }\n  }\n": types.Delete_Story_MutationDocument,
    "\n  mutation VIEW_STORY_MUTATION($id: Int!) {\n    viewStory(id: $id) {\n      id\n      userId\n      storyId\n    }\n  }\n": types.View_Story_MutationDocument,
    "\n  mutation CREATE_COMMENT_MUTATION($id: Int!, $body: String!, $commentId: Int) {\n    createComment(id: $id, body: $body, commentId: $commentId) {\n      ...comment\n    }\n  }\n\n  \n": types.Create_Comment_MutationDocument,
    "\n  mutation DELETE_COMMENT_MUTATION(\n    $id: Int!\n    $hasChildren: Boolean!\n    $commentId: Int\n  ) {\n    deleteComment(id: $id, hasChildren: $hasChildren, commentId: $commentId) {\n      id\n    }\n  }\n": types.Delete_Comment_MutationDocument,
    "\n  mutation UPDATE_COMMENT_MUTATION($id: Int!, $body: String!) {\n    updateComment(id: $id, body: $body) {\n      ...comment\n    }\n  }\n\n  \n": types.Update_Comment_MutationDocument,
    "\n  query ONLY_ME_QUERY {\n    me {\n      ...me\n    }\n  }\n": types.Only_Me_QueryDocument,
    "\n  query INDEX_QUERY(\n    $offset: Int = 0\n    $limit: Int = 8\n    $userId: Int = null\n    $isLiked: Boolean = false\n    $length: String\n    $genres: [Int]\n    $mostLiked: Boolean = false\n    $mostViewed: Boolean = false\n    $mostCommented: Boolean = false\n  ) {\n    me {\n      ...me\n    }\n\n    stories(\n      offset: $offset\n      limit: $limit\n      userId: $userId\n      isLiked: $isLiked\n      length: $length\n      genres: $genres\n      mostLiked: $mostLiked\n      mostViewed: $mostViewed\n      mostCommented: $mostCommented\n    )\n      @connection(\n        key: \"IndexStoriesConnection\"\n        filter: [\"length\", \"genres\", \"mostLiked\", \"mostViewed\", \"mostCommented\"]\n      ) {\n      ...stories\n    }\n\n    genres {\n      id\n      name\n    }\n  }\n": types.Index_QueryDocument,
    "\n  query ME_QUERY($offset: Int = 0, $limit: Int = 8, $userId: Int) {\n    me {\n      ...me\n    }\n\n    writtenStories: stories(\n      offset: $offset\n      limit: $limit\n      userId: $userId\n      isLiked: false\n    )\n      @connection(\n        key: \"WrittenStoriesConnection\"\n        filter: [\"userId\", \"isLiked\"]\n      ) {\n      ...stories\n    }\n\n    favStories: stories(offset: $offset, limit: $limit, isLiked: true)\n      @connection(key: \"LikedStoriesConnection\", filter: [\"isLiked\"]) {\n      ...stories\n    }\n  }\n": types.Me_QueryDocument,
    "\n  query EDIT_STORY_QUERY($id: Int!) {\n    story(id: $id) {\n      ...story\n    }\n\n    genres {\n      id\n      name\n    }\n  }\n": types.Edit_Story_QueryDocument,
    "\n  query USER_QUERY($id: Int!, $offset: Int = 0, $limit: Int = 8) {\n    me {\n      ...me\n    }\n\n    user(id: $id) {\n      ...user\n    }\n\n    stories(offset: $offset, limit: $limit, userId: $id)\n      @connection(key: \"UserStoriesConnection\", filter: [\"userId\"]) {\n      ...stories\n    }\n  }\n": types.User_QueryDocument,
    "\n  query STORY_QUERY($id: Int!) {\n    me {\n      ...me\n    }\n\n    story(id: $id) {\n      ...story\n    }\n\n    comments(storyId: $id) {\n      ...comment\n    }\n  }\n": types.Story_QueryDocument,
    "\n  query GENRES_QUERY {\n    genres {\n      id\n      name\n    }\n  }\n": types.Genres_QueryDocument,
    "\n  query CHECK_LOGGED_IN_QUERY {\n    me {\n      ...me\n    }\n  }\n": types.Check_Logged_In_QueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment me on Me {\n    id\n    username\n    email\n    isVerified\n    photo\n    info\n  }\n"): (typeof documents)["\n  fragment me on Me {\n    id\n    username\n    email\n    isVerified\n    photo\n    info\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment user on User {\n    id\n    username\n    photo\n    info\n  }\n"): (typeof documents)["\n  fragment user on User {\n    id\n    username\n    photo\n    info\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment story on Story {\n    id\n    title\n    body\n    length\n    genre {\n      id\n      name\n    }\n    user {\n      ...user\n    }\n    stats {\n      likes {\n        id\n      }\n      dislikes {\n        id\n      }\n      views {\n        id\n      }\n      comments\n    }\n    createdAt\n  }\n"): (typeof documents)["\n  fragment story on Story {\n    id\n    title\n    body\n    length\n    genre {\n      id\n      name\n    }\n    user {\n      ...user\n    }\n    stats {\n      likes {\n        id\n      }\n      dislikes {\n        id\n      }\n      views {\n        id\n      }\n      comments\n    }\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment stories on StoryConnection {\n    edges {\n      ...story\n    }\n    pageInfo {\n      offset\n      limit\n    }\n  }\n"): (typeof documents)["\n  fragment stories on StoryConnection {\n    edges {\n      ...story\n    }\n    pageInfo {\n      offset\n      limit\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment reaction on Reaction {\n    id\n    state\n    userId\n    storyId\n  }\n"): (typeof documents)["\n  fragment reaction on Reaction {\n    id\n    state\n    userId\n    storyId\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment comment on Comment {\n    id\n    body\n    commentId\n    user {\n      ...user\n    }\n    createdAt\n  }\n"): (typeof documents)["\n  fragment comment on Comment {\n    id\n    body\n    commentId\n    user {\n      ...user\n    }\n    createdAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UPDATE_ACCOUNT_MUTATION($username: String!, $info: String) {\n    updateUser(username: $username, info: $info) {\n      ...me\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation UPDATE_ACCOUNT_MUTATION($username: String!, $info: String) {\n    updateUser(username: $username, info: $info) {\n      ...me\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation POST_PHOTO_MUTATION(\n    $file: Upload!\n    $width: Float!\n    $height: Float!\n    $x: Float!\n    $y: Float!\n  ) {\n    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {\n      photo\n    }\n  }\n"): (typeof documents)["\n  mutation POST_PHOTO_MUTATION(\n    $file: Upload!\n    $width: Float!\n    $height: Float!\n    $x: Float!\n    $y: Float!\n  ) {\n    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {\n      photo\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CHECK_USER_EXIST_MUTATION($login: String!) {\n    checkUserExists(login: $login)\n  }\n"): (typeof documents)["\n  mutation CHECK_USER_EXIST_MUTATION($login: String!) {\n    checkUserExists(login: $login)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      ...me\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {\n    signIn(login: $login, password: $password) {\n      ...me\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SIGN_UP_MUTATION(\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(username: $username, email: $email, password: $password) {\n      ...me\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation SIGN_UP_MUTATION(\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    signUp(username: $username, email: $email, password: $password) {\n      ...me\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation REQUEST_RESET_MUTATION($login: String!) {\n    requestReset(login: $login) {\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation REQUEST_RESET_MUTATION($login: String!) {\n    requestReset(login: $login) {\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RESET_PASSWORD_MUTATION(\n    $token: String!\n    $password: String!\n    $passwordConfirmation: String!\n  ) {\n    resetPassword(\n      token: $token\n      password: $password\n      passwordConfirmation: $passwordConfirmation\n    ) {\n      ...me\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation RESET_PASSWORD_MUTATION(\n    $token: String!\n    $password: String!\n    $passwordConfirmation: String!\n  ) {\n    resetPassword(\n      token: $token\n      password: $password\n      passwordConfirmation: $passwordConfirmation\n    ) {\n      ...me\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VERIFY_MUTATION($token: String!) {\n    verifyUser(token: $token) {\n      ...me\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation VERIFY_MUTATION($token: String!) {\n    verifyUser(token: $token) {\n      ...me\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SIGN_OUT_MUTATION {\n    signOut {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation SIGN_OUT_MUTATION {\n    signOut {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LIKE_MUTATION($id: Int!) {\n    likeStory(id: $id) {\n      id\n      state\n      userId\n      storyId\n    }\n  }\n"): (typeof documents)["\n  mutation LIKE_MUTATION($id: Int!) {\n    likeStory(id: $id) {\n      id\n      state\n      userId\n      storyId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DISLIKE_MUTATION($id: Int!) {\n    dislikeStory(id: $id) {\n      id\n      state\n      userId\n      storyId\n    }\n  }\n"): (typeof documents)["\n  mutation DISLIKE_MUTATION($id: Int!) {\n    dislikeStory(id: $id) {\n      id\n      state\n      userId\n      storyId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CREATE_STORY_MUTATION(\n    $title: String!\n    $body: String!\n    $genreId: Int!\n  ) {\n    createStory(title: $title, body: $body, genreId: $genreId) {\n      ...story\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation CREATE_STORY_MUTATION(\n    $title: String!\n    $body: String!\n    $genreId: Int!\n  ) {\n    createStory(title: $title, body: $body, genreId: $genreId) {\n      ...story\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EDIT_STORY_MUTATION(\n    $id: Int!\n    $body: String!\n    $title: String!\n    $genreId: Int!\n  ) {\n    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {\n      id\n      title\n      body\n    }\n  }\n"): (typeof documents)["\n  mutation EDIT_STORY_MUTATION(\n    $id: Int!\n    $body: String!\n    $title: String!\n    $genreId: Int!\n  ) {\n    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {\n      id\n      title\n      body\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DELETE_STORY_MUTATION($id: Int!) {\n    deleteStory(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DELETE_STORY_MUTATION($id: Int!) {\n    deleteStory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VIEW_STORY_MUTATION($id: Int!) {\n    viewStory(id: $id) {\n      id\n      userId\n      storyId\n    }\n  }\n"): (typeof documents)["\n  mutation VIEW_STORY_MUTATION($id: Int!) {\n    viewStory(id: $id) {\n      id\n      userId\n      storyId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CREATE_COMMENT_MUTATION($id: Int!, $body: String!, $commentId: Int) {\n    createComment(id: $id, body: $body, commentId: $commentId) {\n      ...comment\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation CREATE_COMMENT_MUTATION($id: Int!, $body: String!, $commentId: Int) {\n    createComment(id: $id, body: $body, commentId: $commentId) {\n      ...comment\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DELETE_COMMENT_MUTATION(\n    $id: Int!\n    $hasChildren: Boolean!\n    $commentId: Int\n  ) {\n    deleteComment(id: $id, hasChildren: $hasChildren, commentId: $commentId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DELETE_COMMENT_MUTATION(\n    $id: Int!\n    $hasChildren: Boolean!\n    $commentId: Int\n  ) {\n    deleteComment(id: $id, hasChildren: $hasChildren, commentId: $commentId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UPDATE_COMMENT_MUTATION($id: Int!, $body: String!) {\n    updateComment(id: $id, body: $body) {\n      ...comment\n    }\n  }\n\n  \n"): (typeof documents)["\n  mutation UPDATE_COMMENT_MUTATION($id: Int!, $body: String!) {\n    updateComment(id: $id, body: $body) {\n      ...comment\n    }\n  }\n\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ONLY_ME_QUERY {\n    me {\n      ...me\n    }\n  }\n"): (typeof documents)["\n  query ONLY_ME_QUERY {\n    me {\n      ...me\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query INDEX_QUERY(\n    $offset: Int = 0\n    $limit: Int = 8\n    $userId: Int = null\n    $isLiked: Boolean = false\n    $length: String\n    $genres: [Int]\n    $mostLiked: Boolean = false\n    $mostViewed: Boolean = false\n    $mostCommented: Boolean = false\n  ) {\n    me {\n      ...me\n    }\n\n    stories(\n      offset: $offset\n      limit: $limit\n      userId: $userId\n      isLiked: $isLiked\n      length: $length\n      genres: $genres\n      mostLiked: $mostLiked\n      mostViewed: $mostViewed\n      mostCommented: $mostCommented\n    )\n      @connection(\n        key: \"IndexStoriesConnection\"\n        filter: [\"length\", \"genres\", \"mostLiked\", \"mostViewed\", \"mostCommented\"]\n      ) {\n      ...stories\n    }\n\n    genres {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query INDEX_QUERY(\n    $offset: Int = 0\n    $limit: Int = 8\n    $userId: Int = null\n    $isLiked: Boolean = false\n    $length: String\n    $genres: [Int]\n    $mostLiked: Boolean = false\n    $mostViewed: Boolean = false\n    $mostCommented: Boolean = false\n  ) {\n    me {\n      ...me\n    }\n\n    stories(\n      offset: $offset\n      limit: $limit\n      userId: $userId\n      isLiked: $isLiked\n      length: $length\n      genres: $genres\n      mostLiked: $mostLiked\n      mostViewed: $mostViewed\n      mostCommented: $mostCommented\n    )\n      @connection(\n        key: \"IndexStoriesConnection\"\n        filter: [\"length\", \"genres\", \"mostLiked\", \"mostViewed\", \"mostCommented\"]\n      ) {\n      ...stories\n    }\n\n    genres {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ME_QUERY($offset: Int = 0, $limit: Int = 8, $userId: Int) {\n    me {\n      ...me\n    }\n\n    writtenStories: stories(\n      offset: $offset\n      limit: $limit\n      userId: $userId\n      isLiked: false\n    )\n      @connection(\n        key: \"WrittenStoriesConnection\"\n        filter: [\"userId\", \"isLiked\"]\n      ) {\n      ...stories\n    }\n\n    favStories: stories(offset: $offset, limit: $limit, isLiked: true)\n      @connection(key: \"LikedStoriesConnection\", filter: [\"isLiked\"]) {\n      ...stories\n    }\n  }\n"): (typeof documents)["\n  query ME_QUERY($offset: Int = 0, $limit: Int = 8, $userId: Int) {\n    me {\n      ...me\n    }\n\n    writtenStories: stories(\n      offset: $offset\n      limit: $limit\n      userId: $userId\n      isLiked: false\n    )\n      @connection(\n        key: \"WrittenStoriesConnection\"\n        filter: [\"userId\", \"isLiked\"]\n      ) {\n      ...stories\n    }\n\n    favStories: stories(offset: $offset, limit: $limit, isLiked: true)\n      @connection(key: \"LikedStoriesConnection\", filter: [\"isLiked\"]) {\n      ...stories\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query EDIT_STORY_QUERY($id: Int!) {\n    story(id: $id) {\n      ...story\n    }\n\n    genres {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query EDIT_STORY_QUERY($id: Int!) {\n    story(id: $id) {\n      ...story\n    }\n\n    genres {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query USER_QUERY($id: Int!, $offset: Int = 0, $limit: Int = 8) {\n    me {\n      ...me\n    }\n\n    user(id: $id) {\n      ...user\n    }\n\n    stories(offset: $offset, limit: $limit, userId: $id)\n      @connection(key: \"UserStoriesConnection\", filter: [\"userId\"]) {\n      ...stories\n    }\n  }\n"): (typeof documents)["\n  query USER_QUERY($id: Int!, $offset: Int = 0, $limit: Int = 8) {\n    me {\n      ...me\n    }\n\n    user(id: $id) {\n      ...user\n    }\n\n    stories(offset: $offset, limit: $limit, userId: $id)\n      @connection(key: \"UserStoriesConnection\", filter: [\"userId\"]) {\n      ...stories\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query STORY_QUERY($id: Int!) {\n    me {\n      ...me\n    }\n\n    story(id: $id) {\n      ...story\n    }\n\n    comments(storyId: $id) {\n      ...comment\n    }\n  }\n"): (typeof documents)["\n  query STORY_QUERY($id: Int!) {\n    me {\n      ...me\n    }\n\n    story(id: $id) {\n      ...story\n    }\n\n    comments(storyId: $id) {\n      ...comment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GENRES_QUERY {\n    genres {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GENRES_QUERY {\n    genres {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CHECK_LOGGED_IN_QUERY {\n    me {\n      ...me\n    }\n  }\n"): (typeof documents)["\n  query CHECK_LOGGED_IN_QUERY {\n    me {\n      ...me\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;