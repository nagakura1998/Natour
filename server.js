const dotenv = require('dotenv');
const { connect } = require('http2');
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'})

process.on('uncaughtException', err=>{
    console.log('UNCAUGHT EXCEPTION! Shutting Down...')
    console.log(err);
    process.exit(1);
})

const app = require('./app');

mongoose.connect(process.env.DATABASE)
.then(con=>console.log('DB connection successfully'))

const port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
})

process.on('unhandledRejection', err=>{
    console.log('UNHANDLER REJECTION! Shutting Down...')
    console.log(err);
    server.close(()=>{
        process.exit(1);
    })
})
