import express from "express"
import multer from "multer"
import path from "path"
// const __dirname = path.resolve()
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"uploads")
    },
    filename: function (req, file,cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname)
        cb(null, file.fieldname + "-" + uniqueSuffix+ extension)
    }
})

// Function to check file type
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/; // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true); // File type is acceptable
    } else {
        cb(new Error("Images Only!")); // File type not acceptable
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb); // Validate file type using the checkFileType function
    }
});


    router.post("/", upload.single("image"), function (req, res) {
        if (!req.file) {
            return res.status(404).send("No File Uploaded!")
        }
        res.send({
            message: "Image Uploaded!",
            image: `${req.file.path}`,
           
        })
    })











    export default router