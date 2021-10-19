import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validaiton-composite'
import { Validation } from './validation'

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validaitonStub = new ValidationStub()
    const sut = new ValidationComposite([validaitonStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
