const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/router.js');

const app = express();

app.use(morgan('dev'));

app.use((req,res,next)=>{
console.log('estoy en el middleware');
next();
});

app.use(mainRouter);

module.exports = app;