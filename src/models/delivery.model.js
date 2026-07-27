import { Schema, model, Types } from "mongoose";
import { DELIVERY_STATUS } from "../constants/constants.js";

const DeliverySchema = new Schema({
    order:{
        type: Types.ObjectId,
        ref: "Order",
        required: true
    },
    courier:{
        type: Types.ObjectId,
        ref: "User"
    },
    status:{
        type: String,
        default: DELIVERY_STATUS.PENDING,
        enum: Object.values(DELIVERY_STATUS)
    },
    address:{
        type: String,
        required: false
    },
    estimatedFrom:{
        type: Date,
        required: true,
    },
    estimatedTo:{
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

const DeliveryModel = model("Delivery", DeliverySchema);
export default DeliveryModel;