# IinLookup SDK exists test

require "minitest/autorun"
require_relative "../IinLookup_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IinLookupSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
