import { AddAccountModel } from '../../../domain/useCase/add-account'
import { AccountModel } from '../../../domain/model/account-model'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
