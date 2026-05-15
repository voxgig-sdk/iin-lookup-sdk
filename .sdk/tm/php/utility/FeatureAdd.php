<?php
declare(strict_types=1);

// IinLookup SDK utility: feature_add

class IinLookupFeatureAdd
{
    public static function call(IinLookupContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
