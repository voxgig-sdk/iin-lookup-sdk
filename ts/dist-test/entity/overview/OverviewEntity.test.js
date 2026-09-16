"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OverviewEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IIN_LOOKUP_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IIN_LOOKUP_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IinLookupSDK.test();
        const ent = testsdk.Overview();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IIN_LOOKUP_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'overview.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "overview", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /iin", "json": "{\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"value1\":\"value1\",\"value2\":\"value2\"},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n   \\\"message\\\":\\\"The command was processed successfully.\\\",\\r\\n   \\\"valid\\\":true,\\r\\n   \\\"result\\\":{\\r\\n      \\\"Bin\\\": 324000,\\r\\n      \\\"CardBrand\\\": \\\"AMERICAN EXPRESS\\\",\\r\\n      \\\"IssuingInstitution\\\": \\\"BRANCH BANKING AND TRUST COMPANY\\\",\\r\\n      \\\"CardType\\\": \\\"DEBIT\\\",\\r\\n      \\\"CardCategory\\\": \\\"BUSINESS\\\",\\r\\n      \\\"IssuingCountry\\\": \\\"UNITED STATES\\\",\\r\\n      \\\"IssuingCountryCode\\\": \\\"US\\\"\\r\\n   }\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"OK\"},\"400\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\":\\\"The end-point you have sent the request to is not valid (for example, the end point should be /iin)\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}}},\"401\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The request was not authorised. This can occur when using an incorrect key, if the server IP is not on the account whitelist, or if the account is banned.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Unauthorized\"},\"402\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The request was refused due to a billing issue with the associated account.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Payment Required\"},\"405\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The HTTP request method used is not compatible with the selected end-point. This can occur when using POST rather than GET for example.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Method Not Allowed\"},\"409\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The request has been incorrectly constructed. This can occur when omitting required parameters or providing them in the wrong type. For example, if the BIN number you supply is incorrect.\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}}},\"422\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"Well formatted request however some technical issue is preventing the serving of the request\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Unprocessable Content\"},\"500\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"message\\\": \\\"The client did everything correctly, but we've had an internal issue.\\r\\n\\\"\\r\\n}\",\"schema\":{\"type\":\"string\"}}},\"description\":\"Internal Server Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/iin", "segments": [{ "lit": "iin" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "12345", "kind": "query", "name": "digit", "orig": "digit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "{{secret_key}}", "kind": "query", "name": "key", "orig": "key", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /iin", "json": "{\"parameters\":[{\"example\":\"{{secret_key}}\",\"in\":\"query\",\"name\":\"key\",\"schema\":{\"type\":\"string\"}},{\"example\":\"12345\",\"in\":\"query\",\"name\":\"digits\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"example\":\"{\\r\\n    \\\"valid\\\": true,\\r\\n    \\\"result\\\": {\\r\\n        \\\"Bin\\\": 123456,\\r\\n        \\\"CardBrand\\\": \\\"LOCAL BRAND\\\",\\r\\n        \\\"IssuingInstitution\\\": \\\"\\\",\\r\\n        \\\"CardType\\\": \\\"CREDIT\\\",\\r\\n        \\\"CardCategory\\\": \\\"UATP\\\",\\r\\n        \\\"IssuingCountry\\\": \\\"NICARAGUA\\\",\\r\\n        \\\"IssuingCountryCode\\\": \\\"NI\\\"\\r\\n    }\\r\\n}\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/iin", "segments": [{ "lit": "iin" }], "select": { "exist": ["digit", "key"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "overview", "name__orig": "overview", "Name": "Overview", "name_": "overview", "name-": "overview", "NAME": "OVERVIEW", "index$": 0 }, { "active": true, "entity": "overview", "key$": "BasicOverviewFlow", "kind": "basic", "name": "BasicOverviewFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "overview_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "overview_ref01", "srcdatavar": "overview_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-overview_ref01" } }], "index$": 1 }] }, 'Overview');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const overview_ref01_ent = client.Overview();
        let overview_ref01_data = setup.data.new.overview['overview_ref01'];
        overview_ref01_data = (await overview_ref01_ent.create(overview_ref01_data)).data();
        (0, node_assert_1.default)(null != overview_ref01_data);
        // LOAD
        const overview_ref01_match_dt0 = {};
        const overview_ref01_data_dt0 = (await overview_ref01_ent.load(overview_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != overview_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/overview/OverviewTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IinLookupSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['overview01', 'overview02', 'overview03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IIN_LOOKUP_TEST_OVERVIEW_ENTID': idmap,
        'IIN_LOOKUP_TEST_LIVE': 'FALSE',
        'IIN_LOOKUP_TEST_EXPLAIN': 'FALSE',
        'IIN_LOOKUP_SERVER_BASE_URL': "",
    });
    idmap = env['IIN_LOOKUP_TEST_OVERVIEW_ENTID'];
    const live = 'TRUE' === env.IIN_LOOKUP_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IIN_LOOKUP_TEST_OVERVIEW_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IinLookupSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                server: {
                    base_url: env.IIN_LOOKUP_SERVER_BASE_URL,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IIN_LOOKUP_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OverviewEntity.test.js.map