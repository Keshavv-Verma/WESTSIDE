// Fetch monkey-patch to dynamically rewrite hardcoded localhost API endpoints to relative/production endpoints.
if (typeof globalThis !== 'undefined' && globalThis.fetch && !globalThis.__fetchPatched) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = function (input, init) {
    if (typeof input === 'string' && input.startsWith('http://localhost:3000/')) {
      if (typeof window !== 'undefined') {
        // Browser/Client-side: Rewrite http://localhost:3000/ to relative path /
        input = input.replace('http://localhost:3000/', '/');
      } else {
        // Server-side: Rewrite http://localhost:3000/ to VERCEL_URL if defined, otherwise local fallback
        const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/` : 'http://localhost:3000/';
        input = input.replace('http://localhost:3000/', host);
      }
    }
    return originalFetch(input, init);
  };
  globalThis.__fetchPatched = true;
}

// Override Response.prototype.json to gracefully handle non-JSON responses (like 404 HTML pages) during build time.
if (typeof globalThis !== 'undefined' && globalThis.Response && !globalThis.__responseJsonPatched) {
  const originalJson = globalThis.Response.prototype.json;
  globalThis.Response.prototype.json = async function () {
    try {
      return await originalJson.call(this);
    } catch (err) {
      console.warn("patchFetch intercepted JSON parsing error. Returning fallback object:", err.message);
      return { success: false, products: [], myproduct: null, status: false };
    }
  };
  globalThis.__responseJsonPatched = true;
}

