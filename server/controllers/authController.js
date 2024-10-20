import CUSTOMER from "../model/customerModel.js";

// sign up

export const signUp = async(req,res)=>{
    const {firstName,lastName,email,password,confirmPassword} = req.body
    if(!firstName || !lastName || !email || !password || !confirmPassword){
        res.status(400).json({success:false,errMsg:"all fields are required"});
        return;
    }
    try {
        const existingEmail = await CUSTOMER.findOne({email});
        if(existingEmail){
            res.status(400).json({success:false,errMsg:"Email already in use"})
            return;
        }
        if(password !== confirmPassword){
            res.status(400).json({success:false,errMsg:"password and confirm password must match"})
            return;
        }
        // hash password
        const customer = await CUSTOMER.create({...req.body});
        res.status(201).json({success:true,message:"registerd successfully",customer})

    } catch (error) {
        res.status(500).json(error.message)
    }
}