import { model, Schema } from "mongoose";
import { USER_ROLES } from "../constants/constants.js";
import { DOCUMENT_TYPES } from "../constants/constants.js";

const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    role:{
        type: String,
        default: USER_ROLES.USER,
        enum: Object.values(USER_ROLES)
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

const UserModel = model("User", userSchema);
export default UserModel;