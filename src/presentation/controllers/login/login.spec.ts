import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { EmailValidator } from '../signup/signup-protocols'
import { LoginController } from './login'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    validate (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  makeEmailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const makeEmailValidatorStub = makeEmailValidator()
  const sut = new LoginController(makeEmailValidatorStub)

  return {
    sut,
    makeEmailValidatorStub
  }
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: '123456'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
  test('should call EmailValidator wiht correct email', async () => {
    const { sut, makeEmailValidatorStub } = makeSut()
    const validateSpy = jest.spyOn(makeEmailValidatorStub, 'validate')
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: '123456'
      }
    }
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
