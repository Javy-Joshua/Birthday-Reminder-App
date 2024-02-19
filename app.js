const express = require("express");
const cron = require("node-cron");
const mailer = require("nodemailer");
const UserModel = require("./model/user.model");
const userRouter = require('./users/users.router')
const viewRouter = require('./views/views.router')
const morgan = require('morgan')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use('/users', userRouter)
app.use("/api", viewRouter);

app.use('/home', (req, res) => {
  res.render("homepage")
})



// To get the current Year, Month and Day
const dateYear = new Date().getFullYear();
const dateMonth = new Date().getMonth(); // start counting from 0
const dateDay = new Date().getDate(); // start counting from 1

// credentials for your Mail
// const transporter = mailer.createTestAccount({
//   host: "YOUR STMP SERVER",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "YOUR EMAIL",
//     pass: "YOUR PASSWORD",
//   },
// });

//cron job to run around 7am Server Time
cron.schedule("* * 07 * * *", () => {
  //The main function
  //looping through the users
  UserModel.findAll((element) => {
    //Splitting the Date if Birth (DOB)
    // to get the month and Date
    let d = element.DOB.split("/-|T/");
    let dD = +d[2]; // for the day
    let dM = +d[1]; //for month
    let age = dateYear - +d[0];
    console.log(typeof dM); //return number

    // Sending the Mail
    if (dateDay == dD && dateMonth == dM) {
      const mailOptions = {
        from: "YOUR EMAIL",
        to: element.email,
        subject: `Happy Birthday`,
        html: `Wishing You a <b>Happy Birthday ${element.name}</b> on Your ${age}, Enjoy your day \n <small>this is auto generated</small> `,
      };
      return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          console.log(error); //handle the error here
        }
      });
    }
  });
});

//handle incorrect route
app.get("*", (req, res) => {
  return res.status(404).json({
    data: null,
    error: "Route not found",
  });
});

//global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: "Route not found",
  });
});


module.exports = app