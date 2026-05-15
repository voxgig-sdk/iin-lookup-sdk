<?php
declare(strict_types=1);

// IinLookup SDK utility: prepare_body

class IinLookupPrepareBody
{
    public static function call(IinLookupContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
