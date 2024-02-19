const express = require('express')
const middleware = require('./users.middleware')
const controller = require('./users.controller')

const router = express.Router()

router.post("/details", middleware.ValidateUserCreation, controller.CreateUser);
router.get("/happy", (req, res) => {
    console.log("happy")
})

module.exports = router

// middleware.ValidateUserCreation,        