export class SnapshotSiteError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: unknown;

  constructor(message: string, options?: { statusCode?: number; code?: string; details?: unknown }) {
    super(message);
    this.name = "SnapshotSiteError";
    this.statusCode = options?.statusCode ?? 500;
    this.code = options?.code;
    this.details = options?.details;
  }
}
