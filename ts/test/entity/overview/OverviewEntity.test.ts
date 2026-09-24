

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"overview","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /iin","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/iin","q":{},"r":{},"s":[{"lit":"iin"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /iin","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"12345","k":"query","n":"digit","or":"digit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"{{secret_key}}","k":"query","n":"key","or":"key","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/iin","q":{"exist":["digit","key"]},"r":{},"s":[{"lit":"iin"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"overview","name__orig":"overview","Name":"Overview","name_":"overview","name-":"overview","NAME":"OVERVIEW","index$":0}, {"active":true,"entity":"overview","key$":"BasicOverviewFlow","kind":"basic","name":"BasicOverviewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"overview_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"overview_ref01","srcdatavar":"overview_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-overview_ref01"}}],"index$":1}]}, 'Overview', {"POST /iin":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","example":{"value1":"value1","value2":"value2"},"index$":1}}}},"responses":{"200":{"description":"OK","content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n   \"message\":\"The command was processed successfully.\",\r\n   \"valid\":true,\r\n   \"result\":{\r\n      \"Bin\": 324000,\r\n      \"CardBrand\": \"AMERICAN EXPRESS\",\r\n      \"IssuingInstitution\": \"BRANCH BANKING AND TRUST COMPANY\",\r\n      \"CardType\": \"DEBIT\",\r\n      \"CardCategory\": \"BUSINESS\",\r\n      \"IssuingCountry\": \"UNITED STATES\",\r\n      \"IssuingCountryCode\": \"US\"\r\n   }\r\n}"}}},"400":{"content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\":\"The end-point you have sent the request to is not valid (for example, the end point should be /iin)\"\r\n}"}}},"401":{"description":"Unauthorized","content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\": \"The request was not authorised. This can occur when using an incorrect key, if the server IP is not on the account whitelist, or if the account is banned.\"\r\n}"}}},"402":{"description":"Payment Required","content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\": \"The request was refused due to a billing issue with the associated account.\"\r\n}"}}},"405":{"description":"Method Not Allowed","content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\": \"The HTTP request method used is not compatible with the selected end-point. This can occur when using POST rather than GET for example.\"\r\n}"}}},"409":{"content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\": \"The request has been incorrectly constructed. This can occur when omitting required parameters or providing them in the wrong type. For example, if the BIN number you supply is incorrect.\"\r\n}"}}},"422":{"description":"Unprocessable Content","content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\": \"Well formatted request however some technical issue is preventing the serving of the request\"\r\n}"}}},"500":{"description":"Internal Server Error","content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"message\": \"The client did everything correctly, but we've had an internal issue.\r\n\"\r\n}"}}}},"parameters":[],"securitySource":"unspecified"},"GET /iin":{"protocol":"http","responses":{"200":{"content":{"text/plain":{"schema":{"type":"string"},"example":"{\r\n    \"valid\": true,\r\n    \"result\": {\r\n        \"Bin\": 123456,\r\n        \"CardBrand\": \"LOCAL BRAND\",\r\n        \"IssuingInstitution\": \"\",\r\n        \"CardType\": \"CREDIT\",\r\n        \"CardCategory\": \"UATP\",\r\n        \"IssuingCountry\": \"NICARAGUA\",\r\n        \"IssuingCountryCode\": \"NI\"\r\n    }\r\n}"}}}},"parameters":[{"name":"key","in":"query","schema":{"type":"string"},"example":"{{secret_key}}","index$":0},{"name":"digits","in":"query","schema":{"type":"integer"},"example":"12345","index$":1}],"securitySource":"unspecified"}})
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
  
