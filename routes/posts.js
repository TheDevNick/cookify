const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth")


// Post routes (recipes)
router.get('/:id', postsController.getPost)
router.get('/createPost', postsController.getCreatePost)
router.post('/createPost', upload.single('file'), postsController.createPost)
router.delete("/deletePost/:id", postsController.deletePost)

module.exports = router