const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

//Imported Routes
const indexRouter = require('./routes/index');

const CONFIG = require('./config/config');

const port = process.env.PORT || CONFIG.PORT

mongoose.connect(process.env.MONGODB_URI || CONFIG.MONGODB_URI , {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', function(){
    console.log('connected')
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../build')))

//Routes Usage
app.use('/', indexRouter)

const server = http.createServer(app)
server.listen(port, err => {
    if (err) throw err
    console.log(`Server starting a port: ${port}`)
})