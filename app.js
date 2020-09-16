const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Allow-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Origin','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
}) 

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

mongoose.connect('mongodb+srv://Rishav:KHDKZaT2cnTEn81P@cluster0.192oi.mongodb.net/restApi?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology:true });

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
})

module.exports = app;