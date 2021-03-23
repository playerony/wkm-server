import nodemailer, { Transporter } from 'nodemailer'

import Contact from '../interfaces/contact.interface'

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
