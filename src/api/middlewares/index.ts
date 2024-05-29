import permission from './permission'
import { createToken, isAuth, decodeToken, isRefressToken } from './token'

export default {
  isAuth,
  createToken,
  permission,
  decodeToken,
  isRefressToken,
}
