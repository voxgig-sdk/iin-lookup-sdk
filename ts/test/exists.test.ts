
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IinLookupSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IinLookupSDK.test()
    equal(null !== testsdk, true)
  })

})
