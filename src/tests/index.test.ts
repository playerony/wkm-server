import request from 'supertest'

import App from '../app'
import IndexRoute from '../routes/index.route'

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
})

describe('Testing Index Routes', () => {
  describe('[GET] /', () => {
    it('should return easter egg data :pogchamp:', () => {
      const indexRoute = new IndexRoute()
      const app = new App([indexRoute])

      return request(app.getServer()).get('/').expect({
        achievement: 'easter egg :pogchamp:',
        name: 'wkm-server',
        author: 'Paweł Wojtasiński'
      })
    })
  })
})
