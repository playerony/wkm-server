import jwt from 'jsonwebtoken'
import request from 'supertest'

import App from '../app'
import MailRoute from '../routes/mail.route'

jest.mock('../services/mail.service')

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
})

beforeAll(() => {
  console.error = jest.fn()
})

describe('Testing Mail Routes', () => {
  describe('[POST] /mail/send', () => {
    describe('Validation', () => {
      it('should contain proper error messages for each field', () => {
        const contactData = {}

        process.env.JWT_SECRET = 'secret'
        process.env.EMAIL_LOGIN = 'test@test.com'

        const token = jwt.sign({ code: 'test@test.com' }, 'secret')

        const mailRoute = new MailRoute()
        const app = new App([mailRoute])

        return request(app.getServer()).post('/mail/send').set('authorization-key', token).send(contactData).expect({
          message:
            'email should not be empty,email must be an email, message should not be empty,message must be a string, firstname should not be empty,firstname must be a string, lastname should not be empty,lastname must be a string'
        })
      })
    })
  })
})
