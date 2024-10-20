import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const customerSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validator(value){ 
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[8,"minimum password length is 8"]
    }
},{timestamps:true});

// hashing password
customerSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

// comparing hashpassword
customerSchema.methods.comparePassword = async function(customerPassword){
    const isCorrect = await bcrypt.compare(customerPassword,this.password);
    return isCorrect;
}

// generating token
customerSchema.methods.generateToken = async function(params){
    let token =  jwt.sign({userId:this._id,firstName:this.firstName,lastName:this.lastName},process.env.JWT_SECRETE);
    return token;
}

const CUSTOMER = mongoose.model("customer", customerSchema);

export default CUSTOMER;