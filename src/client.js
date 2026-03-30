"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotSiteClient = void 0;
const errors_1 = require("./errors");
const DEFAULT_BASE_URL = "https://api.prod.ss.snapshot-site.com";
class SnapshotSiteClient {
    apiKey;
    baseUrl;
    userAgent;
    fetchImpl;
    constructor(options) {
        if (!options.apiKey) {
            throw new errors_1.SnapshotSiteError("Snapshot Site API key is required", { statusCode: 400 });
        }
        this.apiKey = options.apiKey;
        this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
        this.userAgent = options.userAgent ?? "@snapshot-site/sdk/0.1.0";
        this.fetchImpl = options.fetch ?? fetch;
    }
    screenshot(input) {
        return this.request("/api/v2/screenshot", input);
    }
    analyze(input) {
        return this.request("/api/v3/analyze", input);
    }
    compare(input) {
        return this.request("/api/v3/compare", input);
    }
    async request(pathname, body) {
        const response = await this.fetchImpl(`${this.baseUrl}${pathname}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "X-SnapshotSiteAPI-Key": this.apiKey,
                "user-agent": this.userAgent,
            },
            body: JSON.stringify(body),
        });
        const raw = await response.text();
        const data = raw ? this.safeJsonParse(raw) : null;
        if (!response.ok) {
            const message = this.readMessage(data) ??
                `Snapshot Site API request failed with status ${response.status}`;
            throw new errors_1.SnapshotSiteError(message, {
                statusCode: response.status,
                details: data ?? raw,
            });
        }
        return (data ?? {});
    }
    safeJsonParse(value) {
        try {
            return JSON.parse(value);
        }
        catch {
            return value;
        }
    }
    readMessage(payload) {
        if (!payload || typeof payload !== "object") {
            return undefined;
        }
        const maybeMessage = payload.message;
        return typeof maybeMessage === "string" ? maybeMessage : undefined;
    }
}
exports.SnapshotSiteClient = SnapshotSiteClient;
