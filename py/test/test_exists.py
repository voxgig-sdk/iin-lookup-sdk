# IinLookup SDK exists test

import pytest
from iinlookup_sdk import IinLookupSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IinLookupSDK.test(None, None)
        assert testsdk is not None
