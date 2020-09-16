const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET Requests to /products"
    })
})

router.post('/',(req,res,next)=>{
    console.log(req.body.name);
    res.status(201).json({
        message:"Handling POST Requests to /products",
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    if(id==="special"){
        res.status(200).json({
            message:"You discovered the special id",
            id:id
        })
    }
    else{
        res.status(200).json({
            message:"You passed an id"
        })
    }
})

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:"Product updated"
    })
})

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:"Product deleted"
    })
})

module.exports = router;