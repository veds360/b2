require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.options('*', cors());



//connectDB
const connectDb=require('./db/connect')
const authenticateUser=require('./middleware/authentication')
//router
const authRouter=require('./routes/auth')
const sellerRouter=require('./routes/seller')
const buyerRouter=require('./routes/buyer')
const generalRouter=require('./routes/general')
const itemPageRouter=require('./routes/itempage')
// const jobsRouter=require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// extra packages

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/gen',generalRouter)
app.use('/api/v1/seller',authenticateUser,sellerRouter)
app.use('/api/v1/buyer',authenticateUser,buyerRouter)
app.use('/api/v1/ah',itemPageRouter)
//app.use('/api/v1/jobs',authenticateUser,jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
