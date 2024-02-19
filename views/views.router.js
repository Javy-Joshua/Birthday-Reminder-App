const express = require("express")

const router = express.Router()

router.get("/created", async (req, res) =>{
    res.render("created")
})

module.exports = router