import mongoose from "mongoose";
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:String,
        required:true,
        trim:true
    },
    rateCount:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:String,
        required:true,
        trim:true
    },
    discountPrice:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});

const PRODUCT = mongoose.model("product",productSchema);

export default PRODUCT;