export async function normalizeListingImageUrls(images = [], uploadImageFn) {
  if (!Array.isArray(images)) return [];

  const normalized = await Promise.all(
    images.map(async (image) => {
      if (!image) return image;

      if (/^https?:\/\//i.test(image)) return image;

      const uploaded = await uploadImageFn(image);
      return uploaded?.url ?? image;
    }),
  );

  return normalized.filter(Boolean);
}
