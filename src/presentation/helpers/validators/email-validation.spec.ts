import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'
import { EmailValidation } from './email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    validate (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator

}
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()

  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    sut, emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('should return an error if EmailValidator retruns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'validate').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidatorStub, 'validate')

    sut.validate({ email: 'any_email@email.com' })

    expect(validateSpy).toHaveBeenCalledWith('any_email@email.com')
  })
  test('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
