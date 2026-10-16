import { Image } from "react-native";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

// Photos straight from a modern phone camera are routinely 6-12 MB (50 MP
// sensors are common), which is slow on mobile data and used to exceed the
// server's size limit — the upload then failed with a generic error. Buyers
// only ever see these at phone-screen size, so downscale + re-encode first.
export const MAX_UPLOAD_DIMENSION = 1600;
export const UPLOAD_JPEG_QUALITY = 0.8;

function getImageSize(uri) {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      reject,
    );
  });
}

/**
 * Returns the URI of a JPEG copy of `uri` whose longest side is at most
 * MAX_UPLOAD_DIMENSION. Never throws: if anything goes wrong (unsupported
 * format, missing file permission, native module unavailable) it falls back to
 * the original URI so the upload can still be attempted.
 */
export async function prepareImageForUpload(uri) {
  try {
    const { width, height } = await getImageSize(uri);
    const context = ImageManipulator.manipulate(uri);

    if (Math.max(width, height) > MAX_UPLOAD_DIMENSION) {
      context.resize(
        width >= height
          ? { width: MAX_UPLOAD_DIMENSION }
          : { height: MAX_UPLOAD_DIMENSION },
      );
    }

    const rendered = await context.renderAsync();
    const saved = await rendered.saveAsync({
      compress: UPLOAD_JPEG_QUALITY,
      format: SaveFormat.JPEG,
    });
    return saved.uri;
  } catch (error) {
    console.warn("Could not prepare image for upload; using original.", error);
    return uri;
  }
}
