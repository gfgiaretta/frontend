import { User } from './prisma'

export type AccessToken = {
  access_token: string
}

export type AccessTokenDecoded = Pick<User, 'email' | 'password'> & {
  iat: number
  exp: number
}
