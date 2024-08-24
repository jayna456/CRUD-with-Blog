const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./blogs/blogs.router');
const userRouter = require('./user/user.router');

const errorHandler = require('./errorHandler');

const app = express();

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log('Database connected successfully!'))
.catch((error) => console.log('Error while connecting to the DB -> ',error))

app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(blogsRouter);

app.listen(process.env.PORT, () => console.log('app is listening on port ', process.env.PORT));