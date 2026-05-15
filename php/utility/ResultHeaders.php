<?php
declare(strict_types=1);

// IinLookup SDK utility: result_headers

class IinLookupResultHeaders
{
    public static function call(IinLookupContext $ctx): ?IinLookupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
