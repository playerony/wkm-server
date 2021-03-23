import { Response, Request, NextFunction } from 'express'

import MailService from '../services/mail.service'
import { ContactDataDto } from '../dtos/contact.dto'

class MailController {
  private _mailService: MailService

  constructor() {
    this._mailService = new MailService()
  }

  public send = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactData: ContactDataDto = req.body

      await this._mailService.send(contactData)

      res.status(200).json({ data: contactData, message: 'send' })
    } catch (error) {
      next(error)
    }
  }
}

export default MailController
