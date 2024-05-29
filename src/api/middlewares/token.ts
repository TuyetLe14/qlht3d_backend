import { sign, verify } from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'

const env = process.env.NODE_ENV || 'dev'
const jwks = require(`../../../jwk.${env}.json`)
const getSecret = (index: number) => {
  const secret = jwkToPem(jwks.keys[index] as jwkToPem.RSA, { private: true })

  return secret
}

const createToken = async (data: any) => {
  const jsontoken = await sign({ user: data }, getSecret(1), {
    expiresIn: 3600,
    algorithm: 'RS256',
  })

  const refreshToken = sign({ user: data }, getSecret(0), {
    expiresIn: '365d',
    algorithm: 'RS256',
  })

  return {
    AccessToken: jsontoken,
    ExpiresIn: 3600,
    TokenType: 'Bearer',
    RefreshToken: refreshToken,
    IdToken: jsontoken,
  }
}
const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}
const isAuth = async (req: any, res: any, next: any): Promise<any> => {
  const token = getTokenFromHeader(req)
  if (token) {
    try {
      const decoded: any = await verify(token, getSecret(1), { algorithms: ['RS256'] })
      req.user = decoded.user
      return next()
    } catch (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
  }

  return res.status(401).json({
    message: 'Unauthorized',
  })
}

const isRefressToken = async (token: string): Promise<any> => {
  const userDetail = verify(token, getSecret(0), { algorithms: ['RS256'] })
  if (!userDetail) {
    throw new Error('Unauthorized')
  }
  const jsontoken = await sign({ user: Object(userDetail).user }, getSecret(1), {
    expiresIn: 3600,
    algorithm: 'RS256',
  })
  const refreshToken = sign({ user: Object(userDetail).user }, getSecret(0), {
    expiresIn: '365d',
    algorithm: 'RS256',
  })

  return {
    AccessToken: jsontoken,
    ExpiresIn: 3600,
    TokenType: 'Bearer',
    IdToken: jsontoken,
    RefreshToken: refreshToken,
  }
}

const decodeToken = async (token: any): Promise<any> => {
  const decoded: any = await verify(token, getSecret(1), { algorithms: ['RS256'] })

  return decoded.user
}

export { createToken, decodeToken, isAuth, isRefressToken }
