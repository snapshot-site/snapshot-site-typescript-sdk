export declare class SnapshotSiteError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly details?: unknown;
    constructor(message: string, options?: {
        statusCode?: number;
        code?: string;
        details?: unknown;
    });
}
