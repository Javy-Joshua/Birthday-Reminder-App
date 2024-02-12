const db = require('./db/index2')
const UserModel = require('./model/user.model')

db.connect().then(async () => {
    await UserModel.insertMany([
        {
            name: "Henny",
            email: "henny@gmail.com",
            DOB: "2-10-2023"
        },
        {
            name: "Dani",
            email: "Dani@gmail.com",
            DOB: "3-6-1990"
        }
    ]);
    console.log('added to db successfully')
    process.exit(1)
}).catch((err) => {
    console.log('Error seeding', err)
}) 