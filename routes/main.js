const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const postController = require('../controllers/posts')

const {ensureAuth, ensureGuest} = require('../middleware/auth')

// Main Routes
router.get('/', homeController.getIndex)
router.get('/profile', postController.getProfile)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/logout', authController.logout)

module.exports = router