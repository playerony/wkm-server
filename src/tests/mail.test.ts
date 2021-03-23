import jwt from 'jsonwebtoken'
import request from 'supertest'

import App from '../app'
import MailRoute from '../routes/mail.route'
import { ContactDataDto } from '../dtos/contact.dto'

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
})

beforeAll(() => {
  console.error = jest.fn()
})

describe('Testing Mail Routes', () => {
  describe('[POST] /mail/send', () => {
    describe('Authorization', () => {
      const contactData: ContactDataDto = {
        message: 'message',
        lastname: 'lastname',
        firstname: 'firstname',
        email: 'test@email.com'
      }

      it('should return 404 when auth token is missing', () => {
        const mailRoute = new MailRoute()
        const app = new App([mailRoute])

        return request(app.getServer()).post('/mail/send').send(contactData).expect({ message: 'Authentication token missing' })
      })

      it('should return 401 when auth token is incorrect', () => {
        const mailRoute = new MailRoute()
        const app = new App([mailRoute])

        return request(app.getServer())
          .post('/mail/send')
          .set('authorization-key', 'random token')
          .send(contactData)
          .expect({ message: 'Wrong authentication token' })
      })

      it('should pass when token is corrent', () => {
        process.env.JWT_SECRET = 'secret'
        process.env.EMAIL_LOGIN = 'test@test.com'

        const token = jwt.sign({ code: 'test@test.com' }, 'secret')

        const mailRoute = new MailRoute()
        const app = new App([mailRoute])

        return request(app.getServer()).post('/mail/send').set('authorization-key', token).send(contactData)
      })
    })

    describe('Validation', () => {
      it('should contain proper error messages for each field', () => {
        const contactData = {}

        process.env.JWT_SECRET = 'secret'
        process.env.EMAIL_LOGIN = 'test@test.com'

        const token = jwt.sign({ code: 'test@test.com' }, 'secret')

        const mailRoute = new MailRoute()
        const app = new App([mailRoute])

        return request(app.getServer())
          .post('/mail/send')
          .set('authorization-key', token)
          .send(contactData)
          .expect({
            message:
              'email should not be empty,email must be an email, message should not be empty,message must be a string, firstname should not be empty,firstname must be a string, lastname should not be empty,lastname must be a string'
          })
      })
    })
  })
})
