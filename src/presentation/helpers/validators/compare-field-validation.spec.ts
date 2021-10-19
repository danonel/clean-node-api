import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('Compare Field Validation', () => {
  test('should return a invalid param error if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'wron_value'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('should not return if validation success', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'any_name'
    })

    expect(error).toBeFalsy()
  })
})
