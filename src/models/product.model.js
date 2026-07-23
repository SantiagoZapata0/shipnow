import { Schema, model } from "mongoose";
import { PRODUCT_STATUS } from "../constants/constants.js";

const prod_status = Object.values(PRODUCT_STATUS);

const ProductSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: PRODUCT_STATUS.AVAILABLE,
      enum: prod_status
    },
    thumbnails: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  });

const ProductModel = model("Product", ProductSchema);

export default ProductModel;
