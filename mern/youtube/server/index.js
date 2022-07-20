import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/User.js'
import videoRoutes from "./routes/Video.js";
import commentRoutes from "./routes/Comment.js";
import authRoutes from './routes/Auth.js'
import bodyParser from "body-parser"


const app = express()
const PORT = process.env.PORT || 5000
const URL = "mongodb+srv://vietahn11082001:dinhvietahn23@test-01.atd5i.mongodb.net/youtubeNew?retryWrites=true&w=majority"


app.use(bodyParser.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

dotenv.config()

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auths", authRoutes);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Connected to mongoDb")
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(err =>{
        console.log("Error: ", err)
    }) 