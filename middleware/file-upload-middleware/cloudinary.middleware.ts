import multer from "multer";
import path from "path";
import os from "os";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = os.tmpdir();
    console.log("📂 Saving to temp folder:", tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const allowedVideoTypes = ["video/mp4", "video/mov", "video/avi"];
  if (allowedImageTypes.includes(file.mimetype) || allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter }).array("images", 10);
