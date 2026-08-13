# IinLookup SDK utility: make_context

from iinlookup_sdk.core.context import IinLookupContext


def make_context_util(ctxmap, basectx):
    return IinLookupContext(ctxmap, basectx)
