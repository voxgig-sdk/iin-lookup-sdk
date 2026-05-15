# IinLookup SDK utility: feature_add
module IinLookupUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
