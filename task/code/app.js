const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;
const MONGO_URI='mongodb+srv://Meghanath:Meghanath@cluster0.6qpoh8g.mongodb.net/taskmanger?retryWrites=true&w=majority'

const start = async () => {
  try {
    const hello=await connectDB(MONGO_URI);
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
