const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
})

module.exports = app;