// import mongoose from 'mongoose ';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const StudentSchema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
    },
    Gender:{
        type: String,
        trim: true,
        required: true
    },
    DOB:{
        type: Date,
        trim: true,
        // required: true
    },
    Avatar:{
        type: String,
        trim: true,
        // required: true
    },
    Created: {
        type: Date,
        default: Date.now
    },
    UpdatedDate: Date,
    Token: String,
    Status: {
        type: Boolean,
        default: true
    }

}, {
    versionKey: false   // __v: 0 hide 
})

StudentSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

const Student = mongoose.model('Student', StudentSchema);
export default Student