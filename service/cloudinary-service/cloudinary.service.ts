import cloudinary from "../../config/cloudinary.config";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const uploadToCloudinary = async (localFilePath: string): Promise<string | null> => {
  try {
    if (!fs.existsSync(localFilePath)) {
      console.error("❌ File does not exist:", localFilePath);
      return null;
    }

    const ext = path.extname(localFilePath).toLowerCase();
    let result;

    if ([".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(ext)) {
      result = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "video",
        folder: "product_videos",
      });
    } else {
      const jpegPath = path.join(
        path.dirname(localFilePath),
        `${path.parse(localFilePath).name}-${Date.now()}.jpeg` // Unique temp name
      );

      if (ext !== ".jpeg" && ext !== ".jpg") {
        await sharp(localFilePath).jpeg({ quality: 80 }).toFile(jpegPath);
      } else {
        fs.copyFileSync(localFilePath, jpegPath);
      }

      result = await cloudinary.uploader.upload(jpegPath, {
        resource_type: "image",
        folder: "product_images",
      });

      fs.unlinkSync(jpegPath);
    }

    fs.unlinkSync(localFilePath);

    console.log("✅ Uploaded to Cloudinary:", result.secure_url);
    return result.secure_url;
  } catch (error: any) {
    console.error("❌ Cloudinary upload failed:", error.message || error);
    return null;
  }
};

export const uploadMultipleToCloudinary = async (filePaths: string[]): Promise<string[]> => {
  const uploadedUrls: string[] = [];

  for (const filePath of filePaths) {
    const url = await uploadToCloudinary(filePath);
    if (url) uploadedUrls.push(url);
  }

  return uploadedUrls;
};
