import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validaiton-composite'
import { Validation } from '../../presentation/helpers/validators/validation'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validaiton-composite')

describe('SignUp Validation Factory', () => {
  test('should call validationcomposite with all validations', () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
