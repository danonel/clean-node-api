import { AccountModel } from '../../../domain/model/account-model'
import { AddAccount, AddAccountModel } from '../../../domain/useCase/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    // @ts-expect-error
    return await new Promise(resolve => resolve(null))
  }
}
