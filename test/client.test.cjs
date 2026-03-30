const test = require("node:test");
const assert = require("node:assert/strict");
const { SnapshotSiteClient, SnapshotSiteError } = require("../build/index.js");

test("sdk sends screenshot request with API key header", async () => {
  const calls = [];
  const client = new SnapshotSiteClient({
    apiKey: "test_key",
    fetch: async (url, init) => {
      calls.push({ url, init });
      return {
        ok: true,
        text: async () => JSON.stringify({ status: "success", fetchTime: "now", message: "ok", url: "https://example.com" }),
      };
    },
  });

  const response = await client.screenshot({ url: "https://example.com", fullSize: true });
  assert.equal(response.status, "success");
  assert.equal(calls[0].url, "https://api.prod.ss.snapshot-site.com/api/v2/screenshot");
  assert.equal(calls[0].init.headers["X-SnapshotSiteAPI-Key"], "test_key");
});

test("sdk throws SnapshotSiteError on non-2xx response", async () => {
  const client = new SnapshotSiteClient({
    apiKey: "test_key",
    fetch: async () => ({
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ message: "Bad request" }),
    }),
  });

  await assert.rejects(
    () => client.compare({ before: { url: "https://a.com" }, after: { url: "https://b.com" } }),
    (error) => {
      assert.ok(error instanceof SnapshotSiteError);
      assert.equal(error.message, "Bad request");
      assert.equal(error.statusCode, 400);
      return true;
    }
  );
});
