import { Schema, model, Types } from "mongoose";
import { ORDER_PRIORITY, ORDER_STATUS, DOCUMENT_TYPES } from "../constants/constants.js";

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
    },
    documents: [
        {
            originalName: { type: String, required: true },
            generatedName: { type: String, required: true },
            path: { type: String, required: true },
            type: { type: String, required: true },
            size: { type: Number, required: true },
            documentType: { type: String, enum: Object.values(DOCUMENT_TYPES), required: true },
            uploadedAt: { type: Date, required: true }
        }
    ]
},
{
    timestamps: true
});

const OrderModel = model("Order", OrderSchema);
export default OrderModel;