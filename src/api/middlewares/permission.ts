import { Response, NextFunction } from 'express'

export default (...args: Array<string>) => {
  return async (req, res: Response, next: NextFunction) => {
    try {
      const ret = args.some((role) => role === req.user.group)
      if (ret) {
        next()
      } else {
        res.status(403).json({ message: 'Forbidden' })
      }
    } catch (err) {
      res.status(403).json({ message: 'Forbidden' })
    }
  }
}
