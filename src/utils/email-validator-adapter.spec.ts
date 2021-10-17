import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('should return false if validatoer returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
  test('should return true if validatoer returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.validate('invalid_email@mail.com')
    expect(isValid).toBe(true)
  })
  test('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.validate('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
