import { SnapshotSiteError } from "./errors";
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  ScreenshotRequest,
  ScreenshotResponse,
  SnapshotSiteClientOptions,
  VisualDiffRequest,
  VisualDiffResponse,
} from "./types";

const DEFAULT_BASE_URL = "https://api.prod.ss.snapshot-site.com";

export class SnapshotSiteClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly userAgent: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: SnapshotSiteClientOptions) {
    if (!options.apiKey) {
      throw new SnapshotSiteError("Snapshot Site API key is required", { statusCode: 400 });
    }

    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.userAgent = options.userAgent ?? "@snapshot-site/sdk/0.1.0";
    this.fetchImpl = options.fetch ?? fetch;
  }

  public screenshot(input: ScreenshotRequest) {
    return this.request<ScreenshotResponse>("/api/v2/screenshot", input);
  }

  public analyze(input: AnalyzeRequest) {
    return this.request<AnalyzeResponse>("/api/v3/analyze", input);
  }

  public compare(input: VisualDiffRequest) {
    return this.request<VisualDiffResponse>("/api/v3/compare", input);
  }

  private async request<TResponse>(pathname: string, body: unknown): Promise<TResponse> {
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
      const message =
        this.readMessage(data) ??
        `Snapshot Site API request failed with status ${response.status}`;

      throw new SnapshotSiteError(message, {
        statusCode: response.status,
        details: data ?? raw,
      });
    }

    return (data ?? {}) as TResponse;
  }

  private safeJsonParse(value: string): unknown {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  private readMessage(payload: unknown): string | undefined {
    if (!payload || typeof payload !== "object") {
      return undefined;
    }

    const maybeMessage = (payload as { message?: unknown }).message;
    return typeof maybeMessage === "string" ? maybeMessage : undefined;
  }
}
