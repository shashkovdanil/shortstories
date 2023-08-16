import { MutationResolvers } from '@/__generated__/resolvers-types'
import {
  generatePasswordHash,
  sendMail,
  validatePassword,
} from '@/features/users/utils'
import { isAuthenticated } from '@/services/auth'
import { type GraphQLContext } from '@/services/context'
import { GraphQLError } from 'graphql'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'

type Mutation = MutationResolvers<GraphQLContext>

type UsersMutations = {
  checkUserExists: Mutation['checkUserExists']
  magicLinkAuth: Mutation['magicLinkAuth']
  requestReset: Mutation['requestReset']
  resetPassword: Mutation['resetPassword']
  sendMagicLink: Mutation['sendMagicLink']
  signIn: Mutation['signIn']
  signOut: Mutation['signOut']
  signUp: Mutation['signUp']
  updateUser: Mutation['updateUser']
  verifyUser: Mutation['verifyUser']
}

const secret = process.env.SECRET as string

export const mutations: UsersMutations = {
  checkUserExists: async (_, { login }, ctx) => {
    const user = await ctx.prisma.users.findFirst({
      where: {
        OR: [
          {
            email: login,
          },
          {
            username: login,
          },
        ],
      },
    })

    return !!user
  },
  magicLinkAuth: async (_, { token }, ctx) => {
    try {
      const { email } = jwt.verify(token, process.env.SECRET) as JwtPayload

      let user = await ctx.prisma.users.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        user = await ctx.prisma.users.create({
          data: {
            email,
            isVerified: true,
            password: '',
            username: email.split('@')[0],
            verifyToken: null,
            verifyTokenExpiry: null,
          },
        })
      }

      cookies().set('token', token, {
        httpOnly: true,
        maxAge: 100 * 60 * 60 * 24 * 365,
      })

      return user
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        if (e.name === 'TokenExpiredError') {
          throw new GraphQLError(`TokenExpiredError`, {
            extensions: {
              code: 'TOKEN_EXPIRED',
              http: {
                status: 401,
              },
              message: `Token expired. Try to sign in again`,
            },
          })
        } else if (e.name === 'JsonWebTokenError') {
          throw new GraphQLError(`JsonWebTokenError`, {
            extensions: {
              code: 'INVALID_TOKEN',
              http: {
                status: 401,
              },
              message: `Invalid token. Try to sign in again`,
            },
          })
        }
      }

      throw new GraphQLError(`JsonWebTokenError`, {
        extensions: {
          code: 'UNAUTHORIZED',
          http: {
            status: 401,
          },
          message: `Cannot verify user. Try to sign in again`,
        },
      })
    }
  },
  requestReset: async (_, { login }, ctx) => {
    const user = await ctx.prisma.users.findFirst({
      where: {
        OR: [
          {
            email: login,
          },
          {
            username: login,
          },
        ],
      },
    })

    if (!user) {
      throw new GraphQLError(`User ${login} doesn't exit`, {
        extensions: {
          code: 'NOT_FOUND',
          http: {
            status: 404,
          },
          message: `User ${login} doesn't exit`,
        },
      })
    }

    const resetToken = nanoid(20)
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    await ctx.prisma.users.update({
      data: {
        resetToken,
        resetTokenExpiry,
      },
      where: {
        id: user.id,
      },
    })

    await sendMail({
      subject: 'Reset Password',
      text: `Click on the link below to reset your password
      \n\n
      <br />
      <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset/${resetToken}">Click here</a>`,
      to: user.email,
    })

    return {
      email: user.email,
    }
  },
  resetPassword: async (_, { password, passwordConfirmation, token }, ctx) => {
    if (password !== passwordConfirmation) {
      throw new GraphQLError(`Passwords do not match`, {
        extensions: {
          code: 'BAD_REQUEST',
          http: {
            status: 400,
          },
          message: `Passwords do not match`,
        },
      })
    }

    const user = await ctx.prisma.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(Date.now() - 3600000),
        },
      },
    })

    if (!user) {
      throw new GraphQLError(`Token has expired or invalid`, {
        extensions: {
          code: 'INVALID_TOKEN',
          http: {
            status: 401,
          },
          message: `Token has expired on invalid`,
        },
      })
    }

    const updatedUser = await ctx.prisma.users.update({
      data: {
        password: await generatePasswordHash(password),
        resetToken: null,
        resetTokenExpiry: null,
      },
      where: {
        id: user.id,
      },
    })

    const jwtToken = jwt.sign({ userId: updatedUser.id }, secret)

    cookies().set('token', jwtToken, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 365,
    })

    return updatedUser
  },
  sendMagicLink: async (_, { email }) => {
    const cookieStore = cookies()
    const lastMagicSentCookie = cookieStore.get('lastMagicSent')

    if (lastMagicSentCookie) {
      const lastMagicSent = parseInt(lastMagicSentCookie.value, 10)

      if (Date.now() - lastMagicSent < 60000) {
        throw new GraphQLError(
          `You can request magic link only once per minute`,
          {
            extensions: {
              code: 'BAD_REQUEST',
              http: {
                status: 429,
              },
              message: `You can request magic link only once per minute`,
            },
          },
        )
      }
    }

    const token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: '1h',
    })

    await sendMail({
      subject: 'Magic Link Auth',
      text: `Click on the link below to login in Shortstories
      \n\n
      <br />
      <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirm/${token}">Click here</a>`,
      to: email,
    })

    cookieStore.set('lastMagicSent', Date.now().toString(), {
      expires: new Date(Date.now() + 60000),
      httpOnly: true,
    })

    return {
      message: 'Success',
    }
  },
  signIn: async (_, { login, password }, ctx) => {
    const user = await ctx.prisma.users.findFirst({
      where: {
        OR: [{ email: login }, { username: login }],
      },
    })

    if (!user) {
      throw new GraphQLError(`User ${login} doesn't exit`, {
        extensions: {
          code: 'NOT_FOUND',
          http: {
            status: 404,
          },
          message: `User ${login} doesn't exit`,
        },
      })
    }

    const isValid = await validatePassword(password, user.password)

    if (!isValid) {
      throw new GraphQLError(`Unauthorized`, {
        extensions: {
          code: 'UNAUTHORIZED',
          http: {
            status: 401,
          },
          message: 'Invalid password',
        },
      })
    }

    const token = jwt.sign({ userId: user.id }, secret)

    cookies().set('token', token, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 365,
    })

    return user
  },
  signOut: async (_, __, ctx) => {
    cookies().delete('token')

    return {
      message: 'Success',
    }
  },
  signUp: async (_, args, ctx) => {
    const verifyToken = nanoid(20)

    const maybeWithAcc = await ctx.prisma.users.count({
      where: {
        email: args.email,
      },
    })

    if (maybeWithAcc !== 0) {
      throw new GraphQLError(`User with email ${args.email} already exists`, {
        extensions: {
          code: 'ALREADY_EXISTS',
          http: {
            status: 400,
          },
          message: `User with email ${args.email} already exists`,
        },
      })
    }

    const user = await ctx.prisma.users.create({
      data: {
        ...args,
        email: args.email.toLowerCase().trim(),
        password: await generatePasswordHash(args.password),
        verifyToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      },
    })

    const token = jwt.sign({ userId: user.id }, secret)

    cookies().set('token', token, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 365,
    })

    await sendMail({
      subject: 'Verify account',
      text: `Welcome to Shortstories! Confirm your email by clicking on the link below:
            \n\n
            <br />
            <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify/${verifyToken}">Click here</a>`,
      to: user.email,
    })

    return user
  },
  updateUser: async (_, args, ctx) => {
    isAuthenticated(ctx)

    const user = await ctx.prisma.users.update({
      data: args,
      where: {
        id: ctx.currentUser!.id,
      },
    })

    return user
  },
  verifyUser: async (_, { token }, ctx) => {
    const user = await ctx.prisma.users.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gte: new Date(Date.now() - 3600000),
        },
      },
    })

    if (!user) {
      throw new GraphQLError(`Token has expired or invalid`, {
        extensions: {
          code: 'INVALID_TOKEN',
          http: {
            status: 401,
          },
          message: `Token has expired on invalid`,
        },
      })
    }

    const verifiedUser = await ctx.prisma.users.update({
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
      where: { id: user.id },
    })

    return verifiedUser
  },
}
