# IinLookup SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IinLookupUtility.registrar = ->(u) {
  u.clean = IinLookupUtilities::Clean
  u.done = IinLookupUtilities::Done
  u.make_error = IinLookupUtilities::MakeError
  u.feature_add = IinLookupUtilities::FeatureAdd
  u.feature_hook = IinLookupUtilities::FeatureHook
  u.feature_init = IinLookupUtilities::FeatureInit
  u.fetcher = IinLookupUtilities::Fetcher
  u.make_fetch_def = IinLookupUtilities::MakeFetchDef
  u.make_context = IinLookupUtilities::MakeContext
  u.make_options = IinLookupUtilities::MakeOptions
  u.make_request = IinLookupUtilities::MakeRequest
  u.make_response = IinLookupUtilities::MakeResponse
  u.make_result = IinLookupUtilities::MakeResult
  u.make_point = IinLookupUtilities::MakePoint
  u.make_spec = IinLookupUtilities::MakeSpec
  u.make_url = IinLookupUtilities::MakeUrl
  u.param = IinLookupUtilities::Param
  u.prepare_auth = IinLookupUtilities::PrepareAuth
  u.prepare_body = IinLookupUtilities::PrepareBody
  u.prepare_headers = IinLookupUtilities::PrepareHeaders
  u.prepare_method = IinLookupUtilities::PrepareMethod
  u.prepare_params = IinLookupUtilities::PrepareParams
  u.prepare_path = IinLookupUtilities::PreparePath
  u.prepare_query = IinLookupUtilities::PrepareQuery
  u.graphql_body = IinLookupUtilities::GraphqlBody
  u.graphql_errors = IinLookupUtilities::GraphqlErrors
  u.result_basic = IinLookupUtilities::ResultBasic
  u.result_body = IinLookupUtilities::ResultBody
  u.result_headers = IinLookupUtilities::ResultHeaders
  u.transform_request = IinLookupUtilities::TransformRequest
  u.transform_response = IinLookupUtilities::TransformResponse
}
