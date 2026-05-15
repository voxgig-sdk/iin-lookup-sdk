# IinLookup SDK feature factory

from feature.base_feature import IinLookupBaseFeature
from feature.test_feature import IinLookupTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IinLookupBaseFeature(),
        "test": lambda: IinLookupTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
