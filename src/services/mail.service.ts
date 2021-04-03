import nodemailer, { Transporter } from 'nodemailer'

import Contact from '../interfaces/contact.interface'
import HttpException from '../exceptions/HttpException'

class MailService {
  private _transporter: Transporter

  constructor() {
    const smtpConfig = {
      port: 465,
      secure: true,
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD
      }
    }

    this._transporter = nodemailer.createTransport(smtpConfig)
  }

  public send = async ({ email, message, lastname, firstname }: Contact): Promise<void> => {
    try {
      const mailOptions = {
        replyTo: email,
        to: process.env.EMAIL_LOGIN,
        from: `${firstname} ${lastname} <${email}>`,
        subject: `Wiadomość od ${firstname} ${lastname}!`,
        html: `<h3>${firstname} ${lastname} pisze,</h3><p>${message}</p><h4>Kontaktowy email zwrotny: ${email}.</h4>`,
      }

      const isClientVerified = this._transporter.verify()

      if (isClientVerified) {
        return this._transporter.sendMail(mailOptions)
      }

      throw new HttpException(446, 'Connection to the SMTP provider has failed')
    } catch (err) {
      throw err
    }
  }
}

export default MailService
