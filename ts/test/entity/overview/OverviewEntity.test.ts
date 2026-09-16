

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IinLookupSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('OverviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IIN_LOOKUP_TEST_LIVE=TRUE.
  afterEach(liveDelay('IIN_LOOKUP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IinLookupSDK.test()
    const ent = testsdk.Overview()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IIN_LOOKUP_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'overview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"overview","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /iin","json":"{\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"value1\":\"value1\",\"value2\":\"value2\"},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n   \\\"message\\\":\\\"The command was processed successfully.\\\",\\r\\n   \\\"valid\\\":true,\\r\\n   \\\"result\\\":{\\r\\n      \\\"Bin\\\": 324000,\\r\\n      \\\"CardBrand\\\": \\\"AMERICAN EXPRESS\\\",\\r\\n      \\\"IssuingInstitution\\\": \\\"BRANCH BANKING AND TRUST COMPANY\\\",\\r\\n      \\\"CardType\\\": \\\"DEBIT\\\",\\r\\n      \\\"CardCategory\\\": \\\"BUSINESS\\\",\\r\\n      \\\"IssuingCountry\\\": \\\"UNITED STATES\\\",\\r\\n      \\\"IssuingCountryCode\\\": \\\"US\\\"\\r\\n   }\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\":\\\"The end-point you have sent the request to is not valid (for example, the end point should be /iin)\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}}},\"401\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The request was not authorised. This can occur when using an incorrect key, if the server IP is not on the account whitelist, or if the account is banned.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Unauthorized\"},\"402\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The request was refused due to a billing issue with the associated account.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Payment Required\"},\"405\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The HTTP request method used is not compatible with the selected end-point. This can occur when using POST rather than GET for example.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Method Not Allowed\"},\"409\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The request has been incorrectly constructed. This can occur when omitting required parameters or providing them in the wrong type. For example, if the BIN number you supply is incorrect.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}}},\"422\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"Well formatted request however some technical issue is preventing the serving of the request\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Unprocessable Content\"},\"500\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The client did everything correctly, but we've had an internal issue.\\r\\n\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Internal Server Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/iin","segments":[{"lit":"iin"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"12345","kind":"query","name":"digit","orig":"digit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"{{secret_key}}","kind":"query","name":"key","orig":"key","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /iin","json":"{\"parameters\":[{\"example\":\"{{secret_key}}\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"example\":\"12345\",\"in\":\"query\",\"name\":\"digits\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"valid\\\": true,\\r\\n    \\\"result\\\": {\\r\\n        \\\"Bin\\\": 123456,\\r\\n        \\\"CardBrand\\\": \\\"LOCAL BRAND\\\",\\r\\n        \\\"IssuingInstitution\\\": \\\"\\\",\\r\\n        \\\"CardType\\\": \\\"CREDIT\\\",\\r\\n        \\\"CardCategory\\\": \\\"UATP\\\",\\r\\n        \\\"IssuingCountry\\\": \\\"NICARAGUA\\\",\\r\\n        \\\"IssuingCountryCode\\\": \\\"NI\\\"\\r\\n    }\\r\\n}\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/iin","segments":[{"lit":"iin"}],"select":{"exist":["digit","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"overview","name__orig":"overview","Name":"Overview","name_":"overview","name-":"overview","NAME":"OVERVIEW","index$":0}, {"active":true,"entity":"overview","key$":"BasicOverviewFlow","kind":"basic","name":"BasicOverviewFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"overview_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"overview_ref01","srcdatavar":"overview_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-overview_ref01"}}],"index$":1}]}, 'Overview')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const overview_ref01_ent = client.Overview()
    let overview_ref01_data = setup.data.new.overview['overview_ref01']

    overview_ref01_data = (await overview_ref01_ent.create(overview_ref01_data)).data()
    assert(null != overview_ref01_data)


    // LOAD
    const overview_ref01_match_dt0: any = {}
    const overview_ref01_data_dt0 = (await overview_ref01_ent.load(overview_ref01_match_dt0)).data()
    assert(null != overview_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/overview/OverviewTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IinLookupSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['overview01','overview02','overview03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IIN_LOOKUP_TEST_OVERVIEW_ENTID': idmap,
    'IIN_LOOKUP_TEST_LIVE': 'FALSE',
    'IIN_LOOKUP_TEST_EXPLAIN': 'FALSE',
    'IIN_LOOKUP_SERVER_BASE_URL': "",
  })

  idmap = env['IIN_LOOKUP_TEST_OVERVIEW_ENTID']

  const live = 'TRUE' === env.IIN_LOOKUP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IIN_LOOKUP_TEST_OVERVIEW_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IinLookupSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        server: {
          base_url: env.IIN_LOOKUP_SERVER_BASE_URL,
        },
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.IIN_LOOKUP_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
