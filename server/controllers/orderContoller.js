import ORDER from "../model/orderModel.js";

// create order
export const order = async(req,res)=>{
    req.body.user = req.user.userId;
    const {orderItems,totalPrice} = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400).json({success:false,errMsg:"no order created"});
        return;
    }
    if(!orderItems || !totalPrice){
        res.status(400).json({success:false,errMsg:"all fields are required to create an order"})
        return;
    }

    try {
        const order = await ORDER.create({...req.body});
        res.status(201).json({success:true,message:"order created" , order})
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
}