// import express, { response } from "express"
// import bodyParser from "body-parser"
// import cors from "cors"
// import posts from "./routers/posts.js"
// import mongoose from "mongoose"
// import express from 'express'

// const app = express()
// const PORT = process.env.PORT || 5000
// const URL = "mongodb+srv://vietahn11082001:dinhvietahn23@test-01.atd5i.mongodb.net/youtube6?retryWrites=true&w=majority"

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(cors())

// // app.use('/posts', posts)

// mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() =>{
//         console.log("Connected to mongoDb")
//         app.listen(PORT, ()=>{
//             console.log(`Server is running on port ${PORT}`)
//         })
//     }).catch(err =>{
//         console.log("Error: ", err)
//     }) 
    

// import express from 'express'
// import mongoose from 'mongoose'
// // import dotenv from 'dotenv'
// import cors from 'cors'
// // import userRoutes from './routes/User.js'
// // import videoRoutes from "./routes/Video.js";
// // import commentRoutes from "./routes/Comment.js";
// import bodyParser from "body-parser"

import express, { response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import posts from "./routers/posts.js"
import mongoose from "mongoose"
// import express from 'express'


const app = express()
const PORT = process.env.PORT || 5000
const URL = "mongodb+srv://vietahn11082001:dinhvietahn23@test-01.atd5i.mongodb.net/youtube1?retryWrites=true&w=majority"


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

// dotenv.config()

// app.use("/api/users", userRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/comments", commentRoutes);

console.log(process.env.MONGO_URL)
mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Connected to mongoDb")
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(err =>{
        console.log("Error: ", err)
    }) 