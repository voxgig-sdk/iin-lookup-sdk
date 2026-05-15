# IinLookup SDK utility: make_context

from core.context import IinLookupContext


def make_context_util(ctxmap, basectx):
    return IinLookupContext(ctxmap, basectx)
