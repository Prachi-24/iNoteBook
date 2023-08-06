const main = require('./db');
const express = require('express')
var cors = require('cors');
const app = express()

app.use(cors());

const port = 5000

main();

app.use('/api/auth/',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:
   ${port}`)
})

