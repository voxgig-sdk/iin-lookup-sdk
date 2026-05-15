<?php
declare(strict_types=1);

// IinLookup SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IinLookupFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IinLookupBaseFeature();
            case "test":
                return new IinLookupTestFeature();
            default:
                return new IinLookupBaseFeature();
        }
    }
}
