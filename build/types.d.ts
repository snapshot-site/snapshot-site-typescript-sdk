export type ImageFormat = "png" | "jpeg" | "jpg" | "webp" | "pdf" | "base64" | "html";
export interface ScreenshotRequest {
    url: string;
    width?: number;
    height?: number;
    format?: ImageFormat;
    delay?: number;
    fullSize?: boolean;
    hideCookie?: boolean;
    javascriptCode?: string;
    hide?: string;
    convert?: boolean;
    language?: string;
    country?: string;
}
export interface ScreenshotResponse {
    status: "success" | "error";
    fetchTime: string;
    message: string;
    url: string;
    width?: number | null;
    height?: number | null;
    link?: string | null;
    image?: string | null;
    html?: string | null;
    error?: boolean | null;
}
export interface AnalyzeRequest {
    url: string;
    format?: Exclude<ImageFormat, "jpg" | "base64">;
    width?: number;
    height?: number;
    delay?: number;
    fullSize?: boolean;
    hideCookie?: boolean;
    hide?: string;
    javascriptCode?: string;
    language?: string;
    waitForDom?: boolean;
    enableSummary?: boolean;
    enableQuality?: boolean;
    forceRefresh?: boolean;
}
export interface AnalyzeResponse {
    status: "success" | "error";
    fetchTime: string;
    message: string;
    url: string;
    screenshot?: {
        link: string;
        width: number;
        height: number;
        html?: string | null;
    } | null;
    summary?: string | null;
    topics?: string[] | null;
    quality?: {
        isBlank: boolean;
        hasCaptcha: boolean;
        httpStatus: number;
        readabilityScore: number;
        notes: string[];
    } | null;
    headings?: {
        h1?: string[];
        h2?: string[];
        h3?: string[];
    } | null;
    metadata?: Record<string, unknown> | null;
    error?: boolean | null;
    fromCache?: boolean | null;
}
export interface VisualDiffSource {
    url?: string | null;
    imageUrl?: string | null;
    width?: number | null;
    height?: number | null;
    delay?: number | null;
    fullSize?: boolean | null;
    hideCookie?: boolean | null;
    javascriptCode?: string | null;
    hide?: string | null;
    language?: string | null;
}
export interface VisualDiffRequest {
    before: VisualDiffSource;
    after: VisualDiffSource;
    threshold?: number | null;
}
export interface VisualDiffResponse {
    status: "success" | "error";
    fetchTime: string;
    message: string;
    error?: boolean | null;
    summary?: {
        mismatchPixels: number;
        mismatchPercentage: number;
        totalPixels: number;
        sameDimensions: boolean;
    } | null;
    before?: {
        link: string;
        width: number;
        height: number;
        source: string;
    } | null;
    after?: {
        link: string;
        width: number;
        height: number;
        source: string;
    } | null;
    diff?: {
        link: string;
        width: number;
        height: number;
    } | null;
}
export interface SnapshotSiteClientOptions {
    apiKey: string;
    baseUrl?: string;
    userAgent?: string;
    fetch?: typeof fetch;
}
