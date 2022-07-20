import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        description:{
            type: String,
            max: 500
        },
        image:{
            type: String
        },
        likes:{
            type: Array,
            default: []
        }
    
    },
    {timestamps:true}
)

export default mongoose.model("posts", postSchema)