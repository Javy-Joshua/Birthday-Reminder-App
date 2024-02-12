const joi = require('joi')

const ValidateUserCreation = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().required(),
            DOB: joi.date().required()
        })
        await schema.validateAsync(req.body, { abortEarly: true})

        next()
    } catch (error) {
       return res.status(409).json({
        message: error.message,
        success: false
       }) 
    }
}

module.exports = {
    ValidateUserCreation
}