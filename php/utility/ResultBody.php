<?php
declare(strict_types=1);

// IinLookup SDK utility: result_body

class IinLookupResultBody
{
    public static function call(IinLookupContext $ctx): ?IinLookupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
