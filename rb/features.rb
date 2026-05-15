# IinLookup SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IinLookupFeatures
  def self.make_feature(name)
    case name
    when "base"
      IinLookupBaseFeature.new
    when "test"
      IinLookupTestFeature.new
    else
      IinLookupBaseFeature.new
    end
  end
end
