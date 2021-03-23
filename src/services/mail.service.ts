import nodemailer, { Transporter } from 'nodemailer'

import Contact from '../interfaces/contact.interface'

class MailService {
  private _transporter: Transporter

  constructor() {
    this._transporter = nodemailer.createTransport({
      port: 587,
      secure: false,
      host: 'smtp.ethereal.email',
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  public send = async ({ email, message, lastname, firstname }: Contact): Promise<void> => {
    try {
      const mailOptions = {
        text: message,
        to: process.env.EMAIL_LOGIN,
        from: `${firstname} ${lastname} <${email}>`,
        subject: `Wiadomość od ${firstname} ${lastname}!`
      }

      await this._transporter.sendMail(mailOptions)
    } catch (err) {
      throw err
    }
  }
}

export default MailService
