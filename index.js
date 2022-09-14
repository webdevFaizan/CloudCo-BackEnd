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
app.use(express.json());    //This line is very important, it is a middle ware,  if you want your server request to carry the 'body', if you do not add this line then in the req.body field there would be undefined stored. I think req.body could be used to send the data back to server


// app.use('/api/auth', require('./routes/auth'));
app.use('/', require('./Routes'));    //This request will go through the index.js file inside routes folder.  If a .use method is present there it will pass on the router to the next router. It will only be executed when the .get or .post method is met.
app.use('/api/notes', require('./Routes/notes'));   //Inside the path app.use('/') method is the one that will trigger this method. Since we are totally on the same path.
app.use('/api/auth', require('./Routes/auth'));


app.listen(port, () => {
  console.log(`Example app listening on url - http://localhost:${port}`)
})
