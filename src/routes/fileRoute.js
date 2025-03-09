import { uploadFile, uploadFileInformation, getFilesInfo } from "../controllers/fileController.js";
import Router from "express";

const router = Router();

router.post("/uploaded-file", uploadFile, uploadFileInformation);
router.get("/file-info", getFilesInfo);

export default router;