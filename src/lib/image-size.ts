import { promises as fs } from "node:fs";

/**
 * Reads intrinsic dimensions from a JPEG or PNG header. Only the first few KB
 * are needed, so this is cheap enough to run for every gallery image without
 * pulling in an image library.
 */
export function parseImageSize(
  buf: Buffer,
): { width: number; height: number } | null {
  // PNG: 8-byte signature, then IHDR with width/height at fixed offsets.
  if (buf.length >= 24 && buf.toString("ascii", 1, 4) === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: walk the marker chain to the first Start-Of-Frame.
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let pos = 2;
    while (pos + 9 < buf.length) {
      if (buf[pos] !== 0xff) {
        pos += 1; // resynchronise on padding
        continue;
      }
      const marker = buf[pos + 1];
      // SOF0-SOF15, excluding DHT (c4), JPG (c8) and DAC (cc)
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isSOF) {
        return {
          height: buf.readUInt16BE(pos + 5),
          width: buf.readUInt16BE(pos + 7),
        };
      }
      const segmentLength = buf.readUInt16BE(pos + 2);
      if (segmentLength < 2) return null;
      pos += 2 + segmentLength;
    }
  }

  return null;
}

/** width / height, or null when the format isn't recognised. */
export async function fileAspect(path: string): Promise<number | null> {
  let handle;
  try {
    handle = await fs.open(path, "r");
    const buf = Buffer.alloc(65536);
    const { bytesRead } = await handle.read(buf, 0, buf.length, 0);
    const size = parseImageSize(buf.subarray(0, bytesRead));
    if (!size || !size.height) return null;
    return Number((size.width / size.height).toFixed(4));
  } catch {
    return null;
  } finally {
    await handle?.close();
  }
}
