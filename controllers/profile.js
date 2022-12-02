const cloudinary = require("../middleware/cloudinary")
const Profile = require('../models/Profile')
const Post = require('../models/Post')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const userProfile = await Profile.find({ user: req.user.id })
      const posts = await Post.find({ user: req.user.id })
      console.log(userProfile)
      res.render("profile.ejs", {
        userProfile: userProfile[0],
        posts: posts,
        user: req.user,
      })
    } catch (err) {
      console.log(err)
    }
  },

  getCreatePost: async (req, res) => {
    res.render("createPost.ejs")
  },
  
  getProfileInfo: (req, res) => {
    res.render("profileInfo.ejs")
  },
  createProfile: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await Profile.create({
        userBio: req.body.userBio,
        userAge: req.body.userAge,
        userCity: req.body.userCity,
        userState: req.body.userState,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      })
      console.log("Profile has been created!")
      res.redirect("/profile")
    } catch (err) {
      console.log(err)
    }
  },
}
