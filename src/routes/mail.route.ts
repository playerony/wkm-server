import { Router } from 'express'

import Route from '../interfaces/routes.interface'
import MailController from '../controllers/mail.controller'

import { ContactDataDto } from '../dtos/contact.dto'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

class MailRoute implements Route {
  public path = '/mail'
  public router = Router()
  public mailController = new MailController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/send`, authMiddleware, validationMiddleware(ContactDataDto), this.mailController.send)
  }
}

export default MailRoute
