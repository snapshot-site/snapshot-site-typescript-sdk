"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotSiteError = void 0;
class SnapshotSiteError extends Error {
    statusCode;
    code;
    details;
    constructor(message, options) {
        super(message);
        this.name = "SnapshotSiteError";
        this.statusCode = options?.statusCode ?? 500;
        this.code = options?.code;
        this.details = options?.details;
    }
}
exports.SnapshotSiteError = SnapshotSiteError;
