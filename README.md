# IinLookup SDK

Look up the issuing bank, card brand, and country behind a card's first 6-11 digits (IIN/BIN)

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About IIN Lookup API

[IIN Lookup API](https://iinapi.com/) is a card IIN/BIN (Issuer Identification Number / Bank Identification Number) lookup service operated by IINAPI. Given the first 6-11 digits of a credit or debit card, it returns metadata about the issuing institution, card brand, and country of issue. Typical use cases include payment routing, fraud detection, and customer analytics.

What you get from the API:

- A single `GET` endpoint that accepts the leading digits of a card number and an API `key` query parameter.
- JSON responses describing the card brand, issuing bank, and country associated with the IIN/BIN.
- Coverage of credit and debit card BINs across major card networks.

Operational notes: authentication is via an API key passed as a query parameter; the operator states there are no arbitrary rate limits, and pricing is metered per call above the free tier (free up to 75 calls/month, then tiered from roughly $0.001 to $0.0035 per call depending on volume). CORS is enabled, making the endpoint usable directly from browser clients.

## Try it

**TypeScript**
```bash
npm install iin-lookup
```

**Python**
```bash
pip install iin-lookup-sdk
```

**PHP**
```bash
composer require voxgig/iin-lookup-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/iin-lookup-sdk/go
```

**Ruby**
```bash
gem install iin-lookup-sdk
```

**Lua**
```bash
luarocks install iin-lookup-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { IinLookupSDK } from 'iin-lookup'

const client = new IinLookupSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o iin-lookup-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "iin-lookup": {
      "command": "/abs/path/to/iin-lookup-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Overview** | Catch-all grouping for the single IIN/BIN lookup operation exposed by the API, hitting the `/iin` endpoint with a card number prefix and API `key`. | `/iin` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from iinlookup_sdk import IinLookupSDK

client = IinLookupSDK({})


# Load a specific overview
overview, err = client.Overview(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'iinlookup_sdk.php';

$client = new IinLookupSDK([]);


// Load a specific overview
[$overview, $err] = $client->Overview(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/iin-lookup-sdk/go"

client := sdk.NewIinLookupSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "IinLookup_sdk"

client = IinLookupSDK.new({})


# Load a specific overview
overview, err = client.Overview(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("iin-lookup_sdk")

local client = sdk.new({})


-- Load a specific overview
local overview, err = client:Overview(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IinLookupSDK.test()
const result = await client.Overview().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IinLookupSDK.test(None, None)
result, err = client.Overview(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IinLookupSDK::test(null, null);
[$result, $err] = $client->Overview(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Overview(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IinLookupSDK.test(nil, nil)
result, err = client.Overview(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Overview(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the IIN Lookup API

- Upstream: [https://iinapi.com/](https://iinapi.com/)
- API docs: [https://iinapi.com/iin_api_specs.yaml](https://iinapi.com/iin_api_specs.yaml)

- Operated commercially by IINAPI (`iinapi.com`); usage is governed by their Privacy Policy, Terms & Conditions, and Usage policies.
- Free tier covers up to 75 calls per month; higher volumes are billed per-call on a sliding scale.
- An API key is required for all calls; optional IP whitelisting is available for additional security.
- Catalogue listing on freepublicapis.com is subject to its own [terms of service](https://freepublicapis.com/terms-of-service).

---

Generated from the IIN Lookup API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
