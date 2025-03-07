import { File, FileInfo } from "../models/fileModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploadedFiles");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
    });
const upload = multer({ storage: storage });

export const uploadFile = upload.array("files");

export const uploadFileInformation = async (req, res) => {
    const file = req.files;
    const { fileName, category, description, price, farmerName } = req.body;
    console.log(file);

    if (!file) {
        res.status(400).json({ message: "no file uploaded." });
    }
    try {
        const fileUrl = file.map((files)=> `${req.protocol}://${req.get("host")}/uploadedFiles/${files.filename}`);

        const newFile = new File({
            fileName: file.originalname,
            filePath: fileUrl,
            size: file.size,
            fileType: file.mimetype,
        });
        const savedFile = await newFile.save();

        res.status(201).json({ success: true, message: "file uploaded successfully", files: savedFile });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};


