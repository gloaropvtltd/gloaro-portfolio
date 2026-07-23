import { requireAdmin } from "@/utils/requireAdmin";
import { uploadMedia } from "@/utils/cloudinary";

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return Response.json({ error: "Cloudinary is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return Response.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: "File exceeds the 10MB limit." }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;
    const result = await uploadMedia(dataUri);
    return Response.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return Response.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
