# IinLookup SDK feature factory

from iinlookup_sdk.feature.base_feature import IinLookupBaseFeature
from iinlookup_sdk.feature.ratelimit_feature import IinLookupRatelimitFeature
from iinlookup_sdk.feature.retry_feature import IinLookupRetryFeature
from iinlookup_sdk.feature.test_feature import IinLookupTestFeature
from iinlookup_sdk.feature.timeout_feature import IinLookupTimeoutFeature


_FEATURES = {
    "base": lambda: IinLookupBaseFeature(),
    "ratelimit": lambda: IinLookupRatelimitFeature(),
    "retry": lambda: IinLookupRetryFeature(),
    "test": lambda: IinLookupTestFeature(),
    "timeout": lambda: IinLookupTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
