import { File, FileInfo } from "../models/fileModel.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploadedFiles");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
    });
const upload = multer({ storage: storage });

export const uploadFile = upload.array("files");

export const uploadFileInformation = async (req, res) => {
    const file = req.files;
    const { userId, fileName, category, description, price, farmerName } = req.body;
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

        const newFileInfo = new FileInfo({
            userId: userId,
            filePath: newFile.fileUrl,
            fileName: fileName,
            category: category,
            description: description,
            price: price,
            farmerName: farmerName,
        });
        const savedFileInfo = await newFileInfo.save();

        res.status(201).json({ success: true, message: "file uploaded successfully", files: savedFile, filesInfo: savedFileInfo });
    } 
    catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};


export  const getFilesInfo = async (req, res) => {
    try {
        const filesInfo = await FileInfo.find();
        if(!filesInfo) {
            res.status(404).json({ message: "no file information found" });
        }
        res.status(200).json({ success: true, message: "file information retrieved successfully", filesInfo: filesInfo });
        
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};
