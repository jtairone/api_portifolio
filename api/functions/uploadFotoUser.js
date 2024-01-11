const multer = require('multer')
const path = require('path')

module.exports = () => {
    const funcoes = {}
    const maxSize = 5000000
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            // Uploads is the Upload_folder_name
            cb(null, 'public/img/users/')
        },
        filename(req, file, cb) {
            // nomefile = `${id}${path.extname(file.originalname)}`
            cb(null, file.originalname)
        },
    })

    funcoes.uploadFoto = multer({
        storage,
        limits: { fileSize: maxSize },
        async fileFilter(req, file, cb) {
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype)
            const extname = filetypes.test(path.extname(
                file.originalname,
            ).toLowerCase())

            if (mimetype && extname) {
                cb(null, true)
            } else {
                cb(null, false)
                // return cb(new Error("Só é aceito imagens PNG|JPG|JPEG"));
            }
        },
        // mypic is the name of file attribute
    })

    return funcoes
}
