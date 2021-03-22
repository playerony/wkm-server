import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import Routes from './interfaces/routes.interface'

import errorMiddleware from './middlewares/error.middleware'

class App {
  public app: express.Application
  public port: string | number
  public env: string

  constructor(routes: Routes[]) {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.env = process.env.NODE_ENV || 'development'

    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`🚀 App listening on the port ${this.port}`)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(cors({ origin: 'domain.com', credentials: true }))
    } else if (this.env === 'development') {
      this.app.use(cors({ origin: true, credentials: true }))
    }

    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App
