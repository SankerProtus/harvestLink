// Local photo URI -> uploaded URL. If a later photo (or the create call itself)
// fails and the person taps "Create Listing" again, photos that already
// uploaded are reused instead of being uploaded to storage a second time.
const uploadedUrlCache = new Map();
const MAX_CACHE_ENTRIES = 50;

// Uploading all photos at once splits a slow mobile connection N ways, so each
// one is more likely to time out. Two at a time is a good balance.
const MAX_PARALLEL_UPLOADS = 2;

function isRemoteUrl(value) {
  return /^https?:\/\//i.test(value);
}

function rememberUpload(localUri, url) {
  if (uploadedUrlCache.size >= MAX_CACHE_ENTRIES) {
    uploadedUrlCache.delete(uploadedUrlCache.keys().next().value);
  }
  uploadedUrlCache.set(localUri, url);
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
  return results;
}

export async function normalizeListingImageUrls(images = [], uploadImageFn) {
  if (!Array.isArray(images)) return [];

  const normalized = await mapWithConcurrency(
    images,
    MAX_PARALLEL_UPLOADS,
    async (image) => {
      if (!image) return null;
      if (isRemoteUrl(image)) return image;

      const cached = uploadedUrlCache.get(image);
      if (cached) return cached;

      const uploaded = await uploadImageFn(image);
      if (!uploaded?.url) {
        // Falling back to the local file:// URI (the old behaviour) only
        // moved the failure to the server as a confusing validation error.
        throw {
          code: "UPLOAD_PROVIDER_ERROR",
          message: "The upload did not return a photo URL",
          status: null,
        };
      }
      rememberUpload(image, uploaded.url);
      return uploaded.url;
    },
  );

  return normalized.filter(Boolean);
}
