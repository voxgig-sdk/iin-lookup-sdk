<?php
declare(strict_types=1);

// IinLookup SDK utility: feature_hook

class IinLookupFeatureHook
{
    public static function call(IinLookupContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
