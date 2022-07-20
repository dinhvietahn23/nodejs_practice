import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/users.js'
import authRouter from './routes/auths.js'
import postRouter from './routes/posts.js'
import conversationRouter from './routes/conversations.js'
import messageRouter from './routes/messages.js'
import Pusher from 'pusher'

const app = express()
const PORT = process.env.PORT || 5000

const pusher = new Pusher({
    appId: "1433820",
    key: "89585e5e1db79d63b3ea",
    secret: "ba61efc5dec14adaf56c",
    cluster: "ap1",
    useTLS: true
  });

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

dotenv.config();

app.get("/", (req, res) =>{
    res.send("Hello World")
})

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/conversations", conversationRouter)
app.use("/api/messages", messageRouter)
app.post("/pusher/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const authReponse = pusher.authorizeChannel(socketId, channel);
    res.send(authResponse);
  });
  
  

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Connected to mongoDb")
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(err =>{
        console.log("Error: ", err)
    }) 
const db = mongoose.connection

db.once('open', ()=>{
    console.log("db connection")

    const msgCollection = db.collection("messages")

    const changeStream = msgCollection.watch()

    changeStream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
                {
                    conversationId: messageDetails.conversationId,
                    sender: messageDetails.sender,
                    text: messageDetails.text,
                    _id:messageDetails._id,
                    createdAt:messageDetails.createdAt,
                    updatedAt:messageDetails.updatedAt,
                    __v:messageDetails.__v
                }
            )
        }
    })
})