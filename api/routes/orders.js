const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET requests to /orders"
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.orderId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"Handling POST requests to /orders",
        createdOrder: order
    })
})

router.get('/:orderid',(req,res,next)=>{
    const id = req.params.orderid
    res.status(200).json({
        message:"Order details.",
        id:id
    })
})


module.exports = router;