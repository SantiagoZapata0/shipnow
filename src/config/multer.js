import multer from "multer"
import fs from "fs"
import __dirname from "../utils/utils.js"
import path from "path"
import CustomError from "../errors/custom-error.js"

function createUploader(folder, prefix){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(__dirname, "..", "uploads", folder)
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true })
            }
            cb(null, dir)
        },

        filename: (req, file, cb) => {
            cb(null, `${prefix}-${Date.now()}-${file.originalname}`)
        }
    })

        return multer({
        storage,
        limits : {fileSize: 1024 * 1024 * 5, files: 3},
        fileFilter: (req, file, cb) => {
            const archives = ["image/png", "image/jpeg", "application/pdf"]
            if(archives.some(achvs => file.mimetype.includes(achvs))){
                cb(null, true)
            } else{
                cb(new CustomError("INVALID_FILE_TYPE"), false)
            }
        }
    })
}

export const uploadReceipt = createUploader("receipts", "receipt")
export const uploadDocument = createUploader("documents", "document")