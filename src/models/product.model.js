import { Schema, model } from "mongoose";
import { PRODUCT_STATUS } from "../constants/constants.js";

const prod_status = Object.values(PRODUCT_STATUS)

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        min: 0,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: PRODUCT_STATUS.AVAILABLE,
        enum: prod_status
    },
    stock:{
        type: Number,
        default: 0,
        select: false
    }
},
    {
    timestamps: true
    }
)

const ProductModel = model("Product", ProductSchema);

export default ProductModel;