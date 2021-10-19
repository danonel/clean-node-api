import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string
  private readonly fieldToCompare: string
  constructor (fieldName: string, fieldToCompare) {
    this.fieldName = fieldName
    this.fieldToCompare = fieldToCompare
  }

  validate (input: any): Error {
    if (this.fieldName !== this.fieldToCompare) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
