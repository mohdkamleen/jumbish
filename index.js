require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => res.send('Server started'));

app.use('/api', require('./routers/index')) 
  


const { MONGO_URI, PORT } = process.env;

mongoose.connect(MONGO_URI).then((res) => {
  console.log("DB connected host : " + mongoose.connection.host);
})

app.listen(PORT, () => console.log(`Connected to Port ${PORT}`));

 