import mongoose from "mongoose";

const schema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp:String,
    received: Boolean
})

export default mongoose.model('messagecontents', schema)