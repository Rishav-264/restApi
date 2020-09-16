const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();
const Product = require('../models/products');

router.get('/',(req,res,next)=>{
   Product.find().exec().then(docs =>{
       console.log(docs);
       res.status(200).json(docs);
   }).catch(err =>{
       console.log(err);
       res.status(404).json({
           message:"no data"
       })
   })
})

router.post('/',(req,res,next)=>{
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    newProduct.save().then(result =>{
        console.log(result);
    }).catch(error=>{
        console.log(error);
    });
    res.status(201).json({
        message:"Handling POST Requests to /products",
        product:newProduct
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id).exec().then(doc=>{
        if(doc!=null){
        console.log(doc);
        res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message:"No such data exists"
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: error
        })
    });
});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id},{ $set:updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message:"Update succsessfull"
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message:err
        })
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:"Succesfully removed"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message:"Doesnt exist"
        })
    })
})

module.exports = router;