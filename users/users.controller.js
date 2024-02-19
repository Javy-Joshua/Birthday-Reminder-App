const UserModel = require('../model/user.model')
const logger = require('../logger/logger')
const moment = require('moment')
const { DateTime } = require('luxon')

require('dotenv').config()

const CreateUser = async (req, res) => {
    try {
      // logger.info("")
      const userfromRequest = req.body;
      console.log(userfromRequest);
      const existingUser = await UserModel.findOne({
        email: userfromRequest.email,
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Details already exist",
        });
      }

      // Output the date string to console for debugging
      console.log("Date of birth string:", userfromRequest.DOB);

      // Validate the date string format (optional)
      // Example regular expression to validate MM/dd/yyyy format
      //   const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      //   if (!dateFormatRegex.test(userfromRequest.DOB)) {
      //     return res.status(400).json({
      //       message: "Invalid date format",
      //     });
      //   }

      let dob;
      try {
        dob = DateTime.fromFormat(userfromRequest.DOB, "yyyy-MM-dd", {
          zone: "Africa/Lagos",
        });
      } catch (error) {
        return res.status(400).json({
          message: "Invalid date format",
          error: error.message,
        });
      }
      
      if (!dob.isValid) {
        return res.status(400).json({
          message: "Invalid date",
        });
      }

      // Adjust the date by one day to ensure consistency when saved to the database
      const adjustedDOB = dob.plus({ days: 1 });

      // Convert the adjusted West Africa DateTime object to UTC
      const dobUTC = adjustedDOB.toUTC();
      //   const dobUTC = dob.toUTC();
      console.log(dob);
      console.log(dobUTC);

      const user = await UserModel.create({
        name: userfromRequest.name,
        email: userfromRequest.email,
        DOB: dobUTC.toJSDate(),
        // DOB: userfromRequest.DOB    dobUTC.toJSDate()
      });
      console.log(user);

      return res.redirect("/api/created");

      // return res.status(201).json({
      //   message: "Details successfully created",
      //   user,
      // });
    }
    catch (error) {
        logger.error(error.message)
        return res.render("homepage", {
          message: "Server Error",
          ...req.body,
        });

        // return res.status(500).json({
        //     message: "Server Error",
        //     data: null,
        //     jky: "controller"
        // })
    }
}


module.exports = {
    CreateUser
}