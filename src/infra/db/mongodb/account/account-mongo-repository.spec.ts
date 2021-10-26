import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollections: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollections = MongoHelper.getCollection('accounts')
    await accountCollections.deleteMany({})
  })
  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account when add is called with success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
  test('Should return an account when loadByEmail is called with success', async () => {
    const sut = makeSut()
    const newAccount = {
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    }
    await accountCollections.insertOne(newAccount)
    const account = await sut.loadByEmail('any_mail@mail.com')

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })
  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()

    const account = await sut.loadByEmail('any_mail@mail.com')

    expect(account).toBeFalsy()
  })
  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const res = await accountCollections.insertOne({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    const fakeAccount = await accountCollections.findOne({ _id: res.insertedId })
    expect(fakeAccount.accessToken).toBeFalsy()
    await sut.updateAccessToken(fakeAccount._id, 'any_token')
    const account = await accountCollections.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
