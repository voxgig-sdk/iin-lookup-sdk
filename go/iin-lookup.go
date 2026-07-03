package voxgigiinlookupsdk

import (
	"github.com/voxgig-sdk/iin-lookup-sdk/go/core"
	"github.com/voxgig-sdk/iin-lookup-sdk/go/entity"
	"github.com/voxgig-sdk/iin-lookup-sdk/go/feature"
	_ "github.com/voxgig-sdk/iin-lookup-sdk/go/utility"
)

// Type aliases preserve external API.
type IinLookupSDK = core.IinLookupSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IinLookupEntity = core.IinLookupEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IinLookupError = core.IinLookupError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewOverviewEntityFunc = func(client *core.IinLookupSDK, entopts map[string]any) core.IinLookupEntity {
		return entity.NewOverviewEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIinLookupSDK = core.NewIinLookupSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIinLookupSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IinLookupSDK  { return NewIinLookupSDK(nil) }
func Test() *IinLookupSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
