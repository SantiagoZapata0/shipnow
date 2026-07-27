import { Schema, model, Types } from "mongoose";
import { ORDER_PRIORITY, ORDER_STATUS } from "../constants/constants.js";

const OrderSchema = new Schema({
    user:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: Types.ObjectId,
                ref: "Product"
            },
            quantity:{
                type: Number,
                min: 1,
                default: 1
            }
        }
    ],
    total:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: ORDER_STATUS.PENDING,
        enum: Object.values(ORDER_STATUS)
    },
    priority:{
        type: String,
        default: ORDER_PRIORITY.LOW,
        enum: Object.values(ORDER_PRIORITY)
    }
},
{
    timestamps: true
});

const OrderModel = model("Order", OrderSchema);
export default OrderModel;