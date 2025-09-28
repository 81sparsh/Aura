import multer from "multer";
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory as Buffer objects
})
export default upload;