const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const postController = require('../controllers/posts')
const upload = require("../middleware/multer")


const {ensureAuth, ensureGuest} = require('../middleware/auth')

// Main Routes
router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/signup', authController.getSignup)
router.post('/signup',upload.single('file'), authController.postSignup)
router.get('/logout', authController.logout)

module.exports = router