const app = require('./app')
const db = require('./db/index2')

const port = process.env.PORT || 3000

db.connect()

app.listen(port, () => console.log(`We are listening to port:${port}`))