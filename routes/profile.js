const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const profileController = require('../controllers/profile')
const upload = require("../middleware/multer")

const { ensureAuth, ensureGuest } = require("../middleware/auth")

// Main Routes
router.get("/", profileController.getProfile)
router.get("/profileInfo", profileController.getProfileInfo)
router.post("/createProfile", upload.single("file"), profileController.createProfile)

module.exports = router
