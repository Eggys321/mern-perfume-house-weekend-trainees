import PRODUCT from "../model/productModel.js";

// C -- for create in CRUD
export const createProduct = async(req,res)=>{
    const {title,image,rating,rateCount,price,discountPrice} = req.body
    if(!title || !image || !rating || !discountPrice || !price || !rateCount ){
        res.status(400).json({success:false,errMsg:"all fields are required"});
        return
    }
    try {
        const product = await PRODUCT.create(req.body);
        res.status(200).json({success:true,message:"product created successfully",product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
        
    }
} 

// R -- read in CRUD

export const allProducts = async(req,res)=>{
    console.log("Fetching products...");

    try {
        const product = await PRODUCT.find();
        console.log("Products fetched successfully");

        if(product && product.length === 0){
            res.status(400).json({success:false,errMsg:"no product(s) found /  created"})
            return
        }

        res.status(200).json({success:true,message:"product(s)",product})
    } catch (error) {
        console.log(error.message);
        console.error("Error fetching products:", error.message);

        res.status(500).json(error.message)
    }
}

// U -- for update in CRUD

export const updateProduct = async(req,res)=>{
    const {productId} = req.params;
    try {
        const product = await PRODUCT.findOneAndUpdate(
            {_id:productId},
            req.body,
            {new:true,runValidators:true}
        )
        res.status(200).json({success:true,message:"product updated",product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
}
// D -- for delete in CRUD

export const deleteProduct = async(req,res)=>{
    const {productId} = req.params;
    try {
        await PRODUCT.findOneAndDelete({_id:productId});
        res.status(200).json({success:true,message:"product deleted"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
}

// getting single product params
export const singleProduct = async (req,res)=>{
    const {productId} = req.params
    try {
        // const product = await PRODUCT.findById(productId);
        const product = await PRODUCT.findOne({_id:productId});
        if(!product){
            res.status(400).json({success:false,errMsg:"product not found"})
            return
        }
        res.status(200).json({success:true,message:"product",product})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
}

// inserting many products
export const insertMany = async(req,res)=>{
    try {
        const products = await PRODUCT.insertMany(req.body);
        res.status(201).json({success:true,message:"all products",products});
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }
}
