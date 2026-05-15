<?php
declare(strict_types=1);

// IinLookup SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IinLookupMakeContext
{
    public static function call(array $ctxmap, ?IinLookupContext $basectx): IinLookupContext
    {
        return new IinLookupContext($ctxmap, $basectx);
    }
}
