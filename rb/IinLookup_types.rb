# frozen_string_literal: true

# Typed models for the IinLookup SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Overview entity data model.
class Overview
end

# Request payload for Overview#load.
#
# @!attribute [rw] digit
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
OverviewLoadMatch = Struct.new(
  :digit,
  :key,
  keyword_init: true
)

# Request payload for Overview#create.
class OverviewCreateData
end

