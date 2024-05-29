import express, { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import routes from '../api'

export default (app): void => {
  app.use(morgan('short'))
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../../public')))

  app.get('/test', (req: Request, res: Response) => {
    return res.json({ test: 'Tuong' })
  })

  app.use('/heritages', routes())



  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */

    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: 'Unauthorized' }).end()
    }
    if (isCelebrateError(err)) {
      return res.status(400).send({ message: err.details.values().next().value.toString() }).end()
    }

    return res
      .status(err.status || 500)
      .json({ message: err.message })
      .end()
  })
}
