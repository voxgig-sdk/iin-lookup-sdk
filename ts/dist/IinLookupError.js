"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IinLookupError = void 0;
class IinLookupError extends Error {
    isIinLookupError = true;
    sdk = 'IinLookup';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IinLookupError = IinLookupError;
//# sourceMappingURL=IinLookupError.js.map