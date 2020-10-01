const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

// We will upload images on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Upload image only admin can use
// router.post('/upload', auth, authAdmin, (req, res) => {
    router.post('/upload', (req, res) => {
    try {
        console.log(req.files)
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status.send(400).json({ msg: "No files were uploaded." })

        const file = req.files.file;

        // Check file Size
        // 1024*1024 = 1MB 
        // 1024*1024*5 = 5MB
        if (file.size > 1024 * 1024) // means if file size > 1MB
        {
            removeTmp(file.tempFilePath)
            return res.status.send(400).json({ msg: "File size too large." })
        }

        // Check file format
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status.send(400).json({ msg: "File format is incorrect." })
        }

        // Create temp folder before upload
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
            if (err) throw err;

            removeTmp(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })
        })

    } catch (err) {
        return res.status.send(500).json({ msg: err.message })
    }
})

// Delete image only admin can use
router.delete('/destroy',auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status.send(400).json({ msg: "No images selected." })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({ msg: "Deleted Image" })
        })

    } catch (err) {
        return res.status.send(500).json({ msg: err.message })
    }
})

// After upload will have files in tmp folder. So we have to delete those files
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router