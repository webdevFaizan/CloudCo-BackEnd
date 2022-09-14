const connectToMongo = require('./db');
const express = require('express')
const cors=require("cors");



connectToMongo();
const app = express()
const port = 5000
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


// app.get('/', (req, res) => {
//   res.send()
// })


// app.use('/api/auth', require('./routes/auth'));
app.use('/', require('./routes'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on url - http://localhost:${port}`)
})
