import { AddAccount } from '../../domain/useCase/add-account'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new MissingParamError('passwordConfirmation'))
      }
      const isEmailValid = this.emailValidator.validate(email)
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        email, name, password
      })
      return {
        statusCode: 200,
        body: 'ok'
      }
    } catch (error) {
      return serverError()
    }
  }
}
