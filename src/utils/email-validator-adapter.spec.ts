import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  test('should return false if validatoer returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
