import type { GraphQLContext } from '@/services/context'
import type { NextRequest } from 'next/server'

import { PrismaClient, Users } from '@prisma/client'
import { GraphQLError } from 'graphql'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function authenticateUser(
  prisma: PrismaClient,
  req: NextRequest,
): Promise<Users | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  console.log('ttttoookkkeen', token)

  if (!token) return null

  const { userId } = jwt.verify(
    token.value,
    process.env.SECRET as string,
  ) as JwtPayload

  if (!userId) return null

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) return null

  return user
}

export function isAuthenticated(ctx: GraphQLContext) {
  if (!ctx.currentUser) {
    throw new GraphQLError(`Access available only to authorized users`, {
      extensions: {
        code: 'FORBIDDEN',
        http: {
          status: 403,
        },
        message: `Access available only to authorized users`,
      },
    })
  }
}
