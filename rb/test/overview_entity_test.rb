# Overview entity test

require "minitest/autorun"
require "json"
require_relative "../IinLookup_sdk"
require_relative "runner"

class OverviewEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = IinLookupSDK.test(nil, nil)
    ent = testsdk.Overview(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = IinLookupConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = IinLookupSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Overview(nil).load({ "digit" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
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
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["IIN_LOOKUP_TEST_OVERVIEW_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IIN_LOOKUP_TEST_OVERVIEW_ENTID" => idmap,
    "IIN_LOOKUP_TEST_LIVE" => "FALSE",
    "IIN_LOOKUP_TEST_EXPLAIN" => "FALSE",
    "IIN_LOOKUP_SERVER_BASE_URL" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["IIN_LOOKUP_TEST_OVERVIEW_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IIN_LOOKUP_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "server" => {
          "base_url" => env["IIN_LOOKUP_SERVER_BASE_URL"],
        },
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
