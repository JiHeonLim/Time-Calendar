//server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const UserData = require('./models/UserData')


mongoose.connect('mongodb://localhost:27017/calendarApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("MONGO CONNECTION is on ERROR!!!!")
        console.log(err)
    })


const app = express();
const PORT = 4000;

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '../client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
})




app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})