import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
