import type { AnalyzeRequest, AnalyzeResponse, ScreenshotRequest, ScreenshotResponse, SnapshotSiteClientOptions, VisualDiffRequest, VisualDiffResponse } from "./types";
export declare class SnapshotSiteClient {
    private readonly apiKey;
    private readonly baseUrl;
    private readonly userAgent;
    private readonly fetchImpl;
    constructor(options: SnapshotSiteClientOptions);
    screenshot(input: ScreenshotRequest): Promise<ScreenshotResponse>;
    analyze(input: AnalyzeRequest): Promise<AnalyzeResponse>;
    compare(input: VisualDiffRequest): Promise<VisualDiffResponse>;
    private request;
    private safeJsonParse;
    private readMessage;
}
