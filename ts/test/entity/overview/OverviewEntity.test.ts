
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { IinLookupSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'overview.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set IIN_LOOKUP_TEST_OVERVIEW_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['IIN_LOOKUP_TEST_OVERVIEW_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'IIN_LOOKUP_TEST_OVERVIEW_ENTID': idmap,
    'IIN_LOOKUP_TEST_LIVE': 'FALSE',
    'IIN_LOOKUP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['IIN_LOOKUP_TEST_OVERVIEW_ENTID']

  const live = 'TRUE' === env.IIN_LOOKUP_TEST_LIVE

  if (live) {
    client = new IinLookupSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
