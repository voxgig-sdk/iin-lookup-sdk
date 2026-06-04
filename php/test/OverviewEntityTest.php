<?php
declare(strict_types=1);

// Overview entity test

require_once __DIR__ . '/../iinlookup_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OverviewEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IinLookupSDK::test(null, null);
        $ent = $testsdk->Overview(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = overview_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "overview." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IINLOOKUP_TEST_OVERVIEW_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $overview_ref01_ent = $client->Overview(null);
        $overview_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.overview"), "overview_ref01"));

        [$overview_ref01_data_result, $err] = $overview_ref01_ent->create($overview_ref01_data, null);
        $this->assertNull($err);
        $overview_ref01_data = Helpers::to_map($overview_ref01_data_result);
        $this->assertNotNull($overview_ref01_data);

        // LOAD
        $overview_ref01_match_dt0 = [];
        [$overview_ref01_data_dt0_loaded, $err] = $overview_ref01_ent->load($overview_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($overview_ref01_data_dt0_loaded);

    }
}

function overview_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/overview/OverviewTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IinLookupSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["overview01", "overview02", "overview03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IINLOOKUP_TEST_OVERVIEW_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IINLOOKUP_TEST_OVERVIEW_ENTID" => $idmap,
        "IINLOOKUP_TEST_LIVE" => "FALSE",
        "IINLOOKUP_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IINLOOKUP_TEST_OVERVIEW_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IINLOOKUP_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new IinLookupSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IINLOOKUP_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IINLOOKUP_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
