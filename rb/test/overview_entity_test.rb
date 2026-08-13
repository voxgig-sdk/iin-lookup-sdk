# Overview entity test

require "minitest/autorun"
require "json"
require_relative "../IinLookup_sdk"
require_relative "runner"

class OverviewEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IinLookupSDK.test(nil, nil)
    ent = testsdk.Overview(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = overview_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "overview." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IIN_LOOKUP_TEST_OVERVIEW_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    overview_ref01_ent = client.Overview(nil)
    overview_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.overview"), "overview_ref01"))

    overview_ref01_data_result = overview_ref01_ent.create(overview_ref01_data, nil)
    overview_ref01_data = Helpers.to_map(overview_ref01_data_result.respond_to?(:data_get) ? overview_ref01_data_result.data_get : overview_ref01_data_result)
    assert !overview_ref01_data.nil?

    # LOAD
    overview_ref01_match_dt0 = {}
    overview_ref01_data_dt0_loaded = overview_ref01_ent.load(overview_ref01_match_dt0, nil)
    assert !overview_ref01_data_dt0_loaded.nil?

  end
end

def overview_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "overview", "OverviewTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IinLookupSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["overview01", "overview02", "overview03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["IIN_LOOKUP_TEST_OVERVIEW_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IIN_LOOKUP_TEST_OVERVIEW_ENTID" => idmap,
    "IIN_LOOKUP_TEST_LIVE" => "FALSE",
    "IIN_LOOKUP_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["IIN_LOOKUP_TEST_OVERVIEW_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IIN_LOOKUP_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = IinLookupSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IIN_LOOKUP_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IIN_LOOKUP_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
