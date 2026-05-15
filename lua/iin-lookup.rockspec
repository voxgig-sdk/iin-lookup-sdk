package = "voxgig-sdk-iin-lookup"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/iin-lookup-sdk.git"
}
description = {
  summary = "IinLookup SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["iin-lookup_sdk"] = "iin-lookup_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
