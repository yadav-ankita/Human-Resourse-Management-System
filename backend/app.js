require('dotenv').config()
const cors = require('cors');


const express=require('express');
const app=express();

const connectDb = require('./db/connect');

//routers
const authRoute=require('./route/auth')

//error Handler
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')



app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('Your HR management backend is running');
});

app.use('/api/v1/auth',authRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const url = 'mongodb://localhost:27017/HRMS'
const start = async () => {
  try {
    await connectDb(url)
    app.listen(port, () => {
      console.log(`app is listeing on port ${port}`)
    })

  } catch (error) {
    console.log("error in app.js", error)
  }
}
start()