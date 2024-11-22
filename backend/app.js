const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const RegRoute = require('./Routes/RegRoute');
const LoginRoute = require('./Routes/LoginRoute');
const FPWDRoute = require('./Routes/ForgotPasswordRoute');
const EmpRoute = require('./Routes/EmployeeRoute');
const DepRoute = require('./Routes/DepartmentRoute');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use('/reg', RegRoute);
app.use('/login', LoginRoute);
app.use('/auth', FPWDRoute);
app.use('/emp', EmpRoute);
app.use('/dep', DepRoute);


mongoose
  .connect(mongoUri)
      .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });