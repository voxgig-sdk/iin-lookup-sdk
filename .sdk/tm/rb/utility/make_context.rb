# IinLookup SDK utility: make_context
require_relative '../core/context'
module IinLookupUtilities
  MakeContext = ->(ctxmap, basectx) {
    IinLookupContext.new(ctxmap, basectx)
  }
end
