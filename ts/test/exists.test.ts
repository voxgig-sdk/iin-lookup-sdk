
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IinLookupSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IinLookupSDK.test()
    equal(testsdk instanceof IinLookupSDK, true,
      'IinLookupSDK.test() must return a client synchronously')
  })

})
