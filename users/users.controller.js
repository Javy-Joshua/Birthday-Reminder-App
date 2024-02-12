const UserModel = require('../model/user.model')
const logger = require('../logger/logger')
const moment = require('moment')

require('dotenv').config()

const CreateUser = async (req, res) => {
    try {
        // logger.info("")
        const userfromRequest = req.body
        console.log(userfromRequest)
        const existingUser = await UserModel.findOne({
            email: userfromRequest.email
        })
 
        if (existingUser) {
            return res.status(409).json({
                message: "Details already exist"
            })
        }

        const birthday = new Date(userfromRequest.DOB);
        // const birthday = moment(userfromRequest.DOB, "MM-DD-YY").toDate();
        // console.log(birthday)

        const user = await UserModel.create({
            name: userfromRequest.name,
            email: userfromRequest.email,
            DOB: birthday
            // DOB: userfromRequest.DOB
        })
        console.log(user)

        return res.status(201).json({
            message:"Details successfully created",
            user,
        })
    }
    catch (error) {
        logger.error(error.message)
        return res.status(500).json({
            message: "Server Error",
            data: null,
            jky: "controller"
        })
    }
}


module.exports = {
    CreateUser
}