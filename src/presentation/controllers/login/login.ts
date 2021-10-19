import { Authentication } from '../../../domain/useCase/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, unauthorazied } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator
  private readonly authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['email', 'password']

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.validate(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorazied()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
