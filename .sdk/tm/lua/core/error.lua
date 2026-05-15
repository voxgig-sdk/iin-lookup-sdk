-- IinLookup SDK error

local IinLookupError = {}
IinLookupError.__index = IinLookupError


function IinLookupError.new(code, msg, ctx)
  local self = setmetatable({}, IinLookupError)
  self.is_sdk_error = true
  self.sdk = "IinLookup"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IinLookupError:error()
  return self.msg
end


function IinLookupError:__tostring()
  return self.msg
end


return IinLookupError
