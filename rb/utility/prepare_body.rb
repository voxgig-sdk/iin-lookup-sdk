# IinLookup SDK utility: prepare_body
require_relative 'media'
module IinLookupUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return IinLookupUtilities.raw_body(ctx.reqdata) if IinLookupUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
