import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconect if mongodb is down', async () => {
    let accountColection = sut.getCollection('accounts')
    expect(accountColection).toBeTruthy()
    await sut.disconnect()
    accountColection = sut.getCollection('accounts')
    expect(accountColection).toBeTruthy()
  })
})
