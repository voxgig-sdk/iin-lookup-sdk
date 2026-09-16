# IinLookup SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IinLookupFeatures
  def self.make_feature(name)
    case name
    when "base"
      IinLookupBaseFeature.new
    when "ratelimit"
      IinLookupRatelimitFeature.new
    when "retry"
      IinLookupRetryFeature.new
    when "test"
      IinLookupTestFeature.new
    when "timeout"
      IinLookupTimeoutFeature.new
    else
      IinLookupBaseFeature.new
    end
  end
end
