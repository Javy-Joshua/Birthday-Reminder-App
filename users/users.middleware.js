const joi = require('joi')

const ValidateUserCreation = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            DOB: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
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

//mm-dd-yyyy format             mm/dd/yyyy formart           yyyy-mm-dd format
//(/^\d{2}-\d{2}-\d{4}$/), (/^\d{2}\/\d{2}\/\d{4}$/),    (/^\d{4}-\d{2}-\d{2}$/)