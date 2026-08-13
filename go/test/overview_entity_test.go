package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/iin-lookup-sdk/go"
	"github.com/voxgig-sdk/iin-lookup-sdk/go/core"

	vs "github.com/voxgig-sdk/iin-lookup-sdk/go/utility/struct"
)

func TestOverviewEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Overview(nil)
		if ent == nil {
			t.Fatal("expected non-nil OverviewEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := overviewBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "overview." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set IIN_LOOKUP_TEST_OVERVIEW_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		overviewRef01Ent := client.Overview(nil)
		overviewRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "overview"}, setup.data), "overview_ref01"))

		overviewRef01DataResult, err := overviewRef01Ent.Create(overviewRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		overviewRef01Data = core.ToMapAny(entityData(overviewRef01DataResult))
		if overviewRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		overviewRef01MatchDt0 := map[string]any{}
		overviewRef01DataDt0Loaded, err := overviewRef01Ent.Load(overviewRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if overviewRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func overviewBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "overview", "OverviewTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read overview test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse overview test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"overview01", "overview02", "overview03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("IIN_LOOKUP_TEST_OVERVIEW_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IIN_LOOKUP_TEST_OVERVIEW_ENTID": idmap,
		"IIN_LOOKUP_TEST_LIVE":      "FALSE",
		"IIN_LOOKUP_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["IIN_LOOKUP_TEST_OVERVIEW_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IIN_LOOKUP_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewIinLookupSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IIN_LOOKUP_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IIN_LOOKUP_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
