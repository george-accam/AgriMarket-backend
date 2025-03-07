import mongoose from "mongoose"

// file
const fileSchema = new mongoose.Schema({
    fileName:{
        type: String,
        // required: true,
    },
    filePath:{
        type: [String],
        // required: true,
    },
    size:{
        type: String,
        // required: true,
    },
    fileType:{
        type: String,
        // required: true,
    },

},{
    timestamps: true,
});

export const File = mongoose.model("file", fileSchema);


// file information
const fileInfoSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true,
    },
    fileName:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    farmerName:{
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

export const FileInfo = mongoose.model("fileInfo", fileInfoSchema);