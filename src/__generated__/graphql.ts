/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  body?: Maybe<Scalars['String']['output']>;
  commentId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Me = {
  __typename?: 'Me';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  info?: Maybe<Scalars['String']['output']>;
  isVerified: Scalars['Boolean']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkUserExists: Scalars['Boolean']['output'];
  createComment: Comment;
  createStory: Story;
  deleteComment: Comment;
  deleteStory: Story;
  dislikeStory: Reaction;
  likeStory: Reaction;
  postPhoto: Me;
  requestReset?: Maybe<RequestReset>;
  resetPassword: Me;
  signIn: Me;
  signOut?: Maybe<SuccessMessage>;
  signUp: Me;
  updateComment: Comment;
  updateStory: Story;
  updateUser: Me;
  verifyUser: Me;
  viewStory: View;
};


export type MutationCheckUserExistsArgs = {
  login: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String']['input'];
  commentId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationCreateStoryArgs = {
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  hasChildren: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDislikeStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLikeStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPostPhotoArgs = {
  file: Scalars['Upload']['input'];
  height: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};


export type MutationRequestResetArgs = {
  login: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  body: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationUpdateStoryArgs = {
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  info?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String']['input'];
};


export type MutationViewStoryArgs = {
  id: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PageInfoStories = {
  __typename?: 'PageInfoStories';
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  me?: Maybe<Me>;
  reactions: Array<Reaction>;
  stories: StoryConnection;
  story: Story;
  user?: Maybe<User>;
};


export type QueryCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  storyId: Scalars['Int']['input'];
};


export type QueryReactionsArgs = {
  storyId: Scalars['Int']['input'];
};


export type QueryStoriesArgs = {
  genres?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isLiked?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mostCommented?: InputMaybe<Scalars['Boolean']['input']>;
  mostLiked?: InputMaybe<Scalars['Boolean']['input']>;
  mostViewed?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['Int']['output'];
  state: Scalars['String']['output'];
  storyId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RequestReset = {
  __typename?: 'RequestReset';
  email: Scalars['String']['output'];
};

export type Stats = {
  __typename?: 'Stats';
  comments: Scalars['Int']['output'];
  dislikes: Array<User>;
  likes: Array<User>;
  views: Array<Maybe<User>>;
};

export type Story = {
  __typename?: 'Story';
  body: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  genre?: Maybe<Genre>;
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  stats: Stats;
  title: Scalars['String']['output'];
  user: User;
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  edges: Array<Maybe<Story>>;
  pageInfo: PageInfoStories;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  info?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type View = {
  __typename?: 'View';
  id: Scalars['Int']['output'];
  storyId: Scalars['Int']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};

export type MeFragment = { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null };

export type UserFragment = { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null };

export type StoryFragment = { __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } };

export type StoriesFragment = { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } } | null>, pageInfo: { __typename?: 'PageInfoStories', offset: number, limit: number } };

export type ReactionFragment = { __typename?: 'Reaction', id: number, state: string, userId: number, storyId: number };

export type CommentFragment = { __typename?: 'Comment', id: number, body?: string | null, commentId?: number | null, createdAt: any, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null } };

export type Update_Account_MutationMutationVariables = Exact<{
  username: Scalars['String']['input'];
  info?: InputMaybe<Scalars['String']['input']>;
}>;


export type Update_Account_MutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } };

export type Post_Photo_MutationMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  width: Scalars['Float']['input'];
  height: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
}>;


export type Post_Photo_MutationMutation = { __typename?: 'Mutation', postPhoto: { __typename?: 'Me', photo?: string | null } };

export type Check_User_Exist_MutationMutationVariables = Exact<{
  login: Scalars['String']['input'];
}>;


export type Check_User_Exist_MutationMutation = { __typename?: 'Mutation', checkUserExists: boolean };

export type Sign_In_MutationMutationVariables = Exact<{
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Sign_In_MutationMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } };

export type Sign_Up_MutationMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Sign_Up_MutationMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } };

export type Request_Reset_MutationMutationVariables = Exact<{
  login: Scalars['String']['input'];
}>;


export type Request_Reset_MutationMutation = { __typename?: 'Mutation', requestReset?: { __typename?: 'RequestReset', email: string } | null };

export type Reset_Password_MutationMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
}>;


export type Reset_Password_MutationMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } };

export type Verify_MutationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type Verify_MutationMutation = { __typename?: 'Mutation', verifyUser: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } };

export type Sign_Out_MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type Sign_Out_MutationMutation = { __typename?: 'Mutation', signOut?: { __typename?: 'SuccessMessage', message?: string | null } | null };

export type Like_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Like_MutationMutation = { __typename?: 'Mutation', likeStory: { __typename?: 'Reaction', id: number, state: string, userId: number, storyId: number } };

export type Dislike_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Dislike_MutationMutation = { __typename?: 'Mutation', dislikeStory: { __typename?: 'Reaction', id: number, state: string, userId: number, storyId: number } };

export type Create_Story_MutationMutationVariables = Exact<{
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
}>;


export type Create_Story_MutationMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } } };

export type Edit_Story_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  body: Scalars['String']['input'];
  title: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
}>;


export type Edit_Story_MutationMutation = { __typename?: 'Mutation', updateStory: { __typename?: 'Story', id: number, title: string, body: string } };

export type Delete_Story_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Delete_Story_MutationMutation = { __typename?: 'Mutation', deleteStory: { __typename?: 'Story', id: number } };

export type View_Story_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type View_Story_MutationMutation = { __typename?: 'Mutation', viewStory: { __typename?: 'View', id: number, userId?: number | null, storyId: number } };

export type Create_Comment_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  body: Scalars['String']['input'];
  commentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Create_Comment_MutationMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, body?: string | null, commentId?: number | null, createdAt: any, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null } } };

export type Delete_Comment_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  hasChildren: Scalars['Boolean']['input'];
  commentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Delete_Comment_MutationMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', id: number } };

export type Update_Comment_MutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  body: Scalars['String']['input'];
}>;


export type Update_Comment_MutationMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: number, body?: string | null, commentId?: number | null, createdAt: any, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null } } };

export type Only_Me_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Only_Me_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } | null };

export type Index_QueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  isLiked?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['String']['input']>;
  genres?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
  mostLiked?: InputMaybe<Scalars['Boolean']['input']>;
  mostViewed?: InputMaybe<Scalars['Boolean']['input']>;
  mostCommented?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Index_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } | null, stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } } | null>, pageInfo: { __typename?: 'PageInfoStories', offset: number, limit: number } }, genres?: Array<{ __typename?: 'Genre', id: number, name: string } | null> | null };

export type Me_QueryQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Me_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } | null, writtenStories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } } | null>, pageInfo: { __typename?: 'PageInfoStories', offset: number, limit: number } }, favStories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } } | null>, pageInfo: { __typename?: 'PageInfoStories', offset: number, limit: number } } };

export type Edit_Story_QueryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Edit_Story_QueryQuery = { __typename?: 'Query', story: { __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } }, genres?: Array<{ __typename?: 'Genre', id: number, name: string } | null> | null };

export type User_QueryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type User_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } | null, user?: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null } | null, stories: { __typename?: 'StoryConnection', edges: Array<{ __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } } | null>, pageInfo: { __typename?: 'PageInfoStories', offset: number, limit: number } } };

export type Story_QueryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Story_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } | null, story: { __typename?: 'Story', id: number, title: string, body: string, length: number, createdAt: any, genre?: { __typename?: 'Genre', id: number, name: string } | null, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null }, stats: { __typename?: 'Stats', comments: number, likes: Array<{ __typename?: 'User', id: number }>, dislikes: Array<{ __typename?: 'User', id: number }>, views: Array<{ __typename?: 'User', id: number } | null> } }, comments: Array<{ __typename?: 'Comment', id: number, body?: string | null, commentId?: number | null, createdAt: any, user: { __typename?: 'User', id: number, username: string, photo?: string | null, info?: string | null } }> };

export type Genres_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Genres_QueryQuery = { __typename?: 'Query', genres?: Array<{ __typename?: 'Genre', id: number, name: string } | null> | null };

export type Check_Logged_In_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Check_Logged_In_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'Me', id: number, username: string, email: string, isVerified: boolean, photo?: string | null, info?: string | null } | null };

export const MeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<MeFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const StoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<StoryFragment, unknown>;
export const StoriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"stories"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StoryConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<StoriesFragment, unknown>;
export const ReactionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"reaction"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"storyId"}}]}}]} as unknown as DocumentNode<ReactionFragment, unknown>;
export const CommentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<CommentFragment, unknown>;
export const Update_Account_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_ACCOUNT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"info"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"info"},"value":{"kind":"Variable","name":{"kind":"Name","value":"info"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Update_Account_MutationMutation, Update_Account_MutationMutationVariables>;
export const Post_Photo_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"POST_PHOTO_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"height"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"x"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"y"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}},{"kind":"Argument","name":{"kind":"Name","value":"height"},"value":{"kind":"Variable","name":{"kind":"Name","value":"height"}}},{"kind":"Argument","name":{"kind":"Name","value":"x"},"value":{"kind":"Variable","name":{"kind":"Name","value":"x"}}},{"kind":"Argument","name":{"kind":"Name","value":"y"},"value":{"kind":"Variable","name":{"kind":"Name","value":"y"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]} as unknown as DocumentNode<Post_Photo_MutationMutation, Post_Photo_MutationMutationVariables>;
export const Check_User_Exist_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CHECK_USER_EXIST_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUserExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}]}]}}]} as unknown as DocumentNode<Check_User_Exist_MutationMutation, Check_User_Exist_MutationMutationVariables>;
export const Sign_In_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SIGN_IN_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Sign_In_MutationMutation, Sign_In_MutationMutationVariables>;
export const Sign_Up_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SIGN_UP_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Sign_Up_MutationMutation, Sign_Up_MutationMutationVariables>;
export const Request_Reset_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"REQUEST_RESET_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<Request_Reset_MutationMutation, Request_Reset_MutationMutationVariables>;
export const Reset_Password_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RESET_PASSWORD_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"passwordConfirmation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Reset_Password_MutationMutation, Reset_Password_MutationMutationVariables>;
export const Verify_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VERIFY_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Verify_MutationMutation, Verify_MutationMutationVariables>;
export const Sign_Out_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SIGN_OUT_MUTATION"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<Sign_Out_MutationMutation, Sign_Out_MutationMutationVariables>;
export const Like_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LIKE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"storyId"}}]}}]}}]} as unknown as DocumentNode<Like_MutationMutation, Like_MutationMutationVariables>;
export const Dislike_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DISLIKE_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"storyId"}}]}}]}}]} as unknown as DocumentNode<Dislike_MutationMutation, Dislike_MutationMutationVariables>;
export const Create_Story_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CREATE_STORY_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"genreId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<Create_Story_MutationMutation, Create_Story_MutationMutationVariables>;
export const Edit_Story_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EDIT_STORY_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"genreId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]} as unknown as DocumentNode<Edit_Story_MutationMutation, Edit_Story_MutationMutationVariables>;
export const Delete_Story_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_STORY_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Delete_Story_MutationMutation, Delete_Story_MutationMutationVariables>;
export const View_Story_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VIEW_STORY_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"storyId"}}]}}]}}]} as unknown as DocumentNode<View_Story_MutationMutation, View_Story_MutationMutationVariables>;
export const Create_Comment_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CREATE_COMMENT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<Create_Comment_MutationMutation, Create_Comment_MutationMutationVariables>;
export const Delete_Comment_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DELETE_COMMENT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasChildren"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"hasChildren"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasChildren"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Delete_Comment_MutationMutation, Delete_Comment_MutationMutationVariables>;
export const Update_Comment_MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UPDATE_COMMENT_MUTATION"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<Update_Comment_MutationMutation, Update_Comment_MutationMutationVariables>;
export const Only_Me_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ONLY_ME_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Only_Me_QueryQuery, Only_Me_QueryQueryVariables>;
export const Index_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"INDEX_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"8"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"NullValue"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isLiked"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"length"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genres"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mostLiked"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mostViewed"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mostCommented"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isLiked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isLiked"}}},{"kind":"Argument","name":{"kind":"Name","value":"length"},"value":{"kind":"Variable","name":{"kind":"Name","value":"length"}}},{"kind":"Argument","name":{"kind":"Name","value":"genres"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genres"}}},{"kind":"Argument","name":{"kind":"Name","value":"mostLiked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mostLiked"}}},{"kind":"Argument","name":{"kind":"Name","value":"mostViewed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mostViewed"}}},{"kind":"Argument","name":{"kind":"Name","value":"mostCommented"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mostCommented"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"IndexStoriesConnection","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"length","block":false},{"kind":"StringValue","value":"genres","block":false},{"kind":"StringValue","value":"mostLiked","block":false},{"kind":"StringValue","value":"mostViewed","block":false},{"kind":"StringValue","value":"mostCommented","block":false}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"stories"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"stories"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StoryConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<Index_QueryQuery, Index_QueryQueryVariables>;
export const Me_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ME_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"8"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"writtenStories"},"name":{"kind":"Name","value":"stories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isLiked"},"value":{"kind":"BooleanValue","value":false}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"WrittenStoriesConnection","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"userId","block":false},{"kind":"StringValue","value":"isLiked","block":false}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"stories"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"favStories"},"name":{"kind":"Name","value":"stories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"isLiked"},"value":{"kind":"BooleanValue","value":true}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"LikedStoriesConnection","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"isLiked","block":false}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"stories"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"stories"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StoryConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<Me_QueryQuery, Me_QueryQueryVariables>;
export const Edit_Story_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EDIT_STORY_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<Edit_Story_QueryQuery, Edit_Story_QueryQueryVariables>;
export const User_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"USER_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"StringValue","value":"UserStoriesConnection","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ListValue","values":[{"kind":"StringValue","value":"userId","block":false}]}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"stories"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"stories"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StoryConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}}]}}]}}]} as unknown as DocumentNode<User_QueryQuery, User_QueryQueryVariables>;
export const Story_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"STORY_QUERY"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}},{"kind":"Field","name":{"kind":"Name","value":"story"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"story"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"storyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"user"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"story"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"commentId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<Story_QueryQuery, Story_QueryQueryVariables>;
export const Genres_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GENRES_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Genres_QueryQuery, Genres_QueryQueryVariables>;
export const Check_Logged_In_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CHECK_LOGGED_IN_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"info"}}]}}]} as unknown as DocumentNode<Check_Logged_In_QueryQuery, Check_Logged_In_QueryQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  body?: Maybe<Scalars['String']['output']>;
  commentId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Me = {
  __typename?: 'Me';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  info?: Maybe<Scalars['String']['output']>;
  isVerified: Scalars['Boolean']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkUserExists: Scalars['Boolean']['output'];
  createComment: Comment;
  createStory: Story;
  deleteComment: Comment;
  deleteStory: Story;
  dislikeStory: Reaction;
  likeStory: Reaction;
  postPhoto: Me;
  requestReset?: Maybe<RequestReset>;
  resetPassword: Me;
  signIn: Me;
  signOut?: Maybe<SuccessMessage>;
  signUp: Me;
  updateComment: Comment;
  updateStory: Story;
  updateUser: Me;
  verifyUser: Me;
  viewStory: View;
};


export type MutationCheckUserExistsArgs = {
  login: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String']['input'];
  commentId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};


export type MutationCreateStoryArgs = {
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  commentId?: InputMaybe<Scalars['Int']['input']>;
  hasChildren: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDislikeStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLikeStoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPostPhotoArgs = {
  file: Scalars['Upload']['input'];
  height: Scalars['Float']['input'];
  width: Scalars['Float']['input'];
  x: Scalars['Float']['input'];
  y: Scalars['Float']['input'];
};


export type MutationRequestResetArgs = {
  login: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  body: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationUpdateStoryArgs = {
  body: Scalars['String']['input'];
  genreId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  info?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String']['input'];
};


export type MutationViewStoryArgs = {
  id: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PageInfoStories = {
  __typename?: 'PageInfoStories';
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  me?: Maybe<Me>;
  reactions: Array<Reaction>;
  stories: StoryConnection;
  story: Story;
  user?: Maybe<User>;
};


export type QueryCommentsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  storyId: Scalars['Int']['input'];
};


export type QueryReactionsArgs = {
  storyId: Scalars['Int']['input'];
};


export type QueryStoriesArgs = {
  genres?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  isLiked?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mostCommented?: InputMaybe<Scalars['Boolean']['input']>;
  mostLiked?: InputMaybe<Scalars['Boolean']['input']>;
  mostViewed?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['Int']['output'];
  state: Scalars['String']['output'];
  storyId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RequestReset = {
  __typename?: 'RequestReset';
  email: Scalars['String']['output'];
};

export type Stats = {
  __typename?: 'Stats';
  comments: Scalars['Int']['output'];
  dislikes: Array<User>;
  likes: Array<User>;
  views: Array<Maybe<User>>;
};

export type Story = {
  __typename?: 'Story';
  body: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  genre?: Maybe<Genre>;
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  stats: Stats;
  title: Scalars['String']['output'];
  user: User;
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  edges: Array<Maybe<Story>>;
  pageInfo: PageInfoStories;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  info?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type View = {
  __typename?: 'View';
  id: Scalars['Int']['output'];
  storyId: Scalars['Int']['output'];
  userId?: Maybe<Scalars['Int']['output']>;
};
