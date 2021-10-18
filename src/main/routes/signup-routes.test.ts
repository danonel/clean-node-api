import request from 'supertest'
import app from '../config/app'

describe('Signup Route', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: '1234',
        passwordConfirmation: '1234'
      })
      .expect(200)
  })
})
