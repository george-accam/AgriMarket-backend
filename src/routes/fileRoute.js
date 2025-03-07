import { uploadFileInformation } from "../controllers/fileController.js";
import { uploadFile } from "../controllers/fileController.js";
import Router from "express";

const router = Router();

router.post("/uploaded-file", uploadFile, uploadFileInformation);

export default router;