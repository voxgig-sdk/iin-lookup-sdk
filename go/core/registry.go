package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewOverviewEntityFunc func(client *IinLookupSDK, entopts map[string]any) IinLookupEntity

