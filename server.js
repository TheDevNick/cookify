const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const passport = require('passport')
const session = require("express-session")
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override")
const flash = require("express-flash")

// configuring dotenv
dotenv.config({path: './config/config.env'})

// passport configuration
require('./config/passport')(passport)

// Connect to db
connectDB()
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// using ejs for the view engine
app.set("view engine", "ejs")

// add logging if we are in development mode
if(process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

// use forms for put / delete
app.use(methodOverride('_method'))

// setup sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


// use flash messages for errors, info, etc..
app.use(flash())
// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', mainRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} environment on port ${PORT}`))