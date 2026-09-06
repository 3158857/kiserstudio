import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/auth";
import { UPLOAD_PREFIX } from "@/lib/store";

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // The only gate on uploads — the admin layout does not cover routes.
        if (!(await isAuthenticated())) throw new Error("Not signed in.");
        if (!pathname.startsWith(UPLOAD_PREFIX)) {
          throw new Error("Uploads must live under the artwork prefix.");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/avif",
          ],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Nothing to do: the admin discovers new uploads by listing the store.
      },
    });

    return Response.json(result);
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }
}
