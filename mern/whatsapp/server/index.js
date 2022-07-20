 import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

const pusher = new Pusher({
    appId: "1433820",
    key: "89585e5e1db79d63b3ea",
    secret: "ba61efc5dec14adaf56c",
    cluster: "ap1",
    useTLS: true
  });
  

app.use(express.json())
app.use(cors())


// const MONGO_URL = "mongodb+srv://ahndv3ho:ahndv3.ho@cluster0.brxg7uq.mongodb.net/whatsAppDb?retryWrites=true&w=majority"
const MONGO_URL = "mongodb+srv://vietahn11082001:dinhvietahn23@test-01.atd5i.mongodb.net/whatsAppDb?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected to mongodb")
        app.listen(PORT, ()=>{
            console.log(`Server is listening at port ${PORT}`)
        })
    }).catch(err=>{
        console.log("Error:", err)
    })

const db = mongoose.connection

db.once('open', ()=>{
    console.log("db connection")

    const msgCollection = db.collection("messagecontents")

    const changeStream = msgCollection.watch()

    changeStream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp
                }
            )
        }
    })
})

app.get('/', (request, respone) => {
    respone.status(200).send('heqfkehw')
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data)=>{
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/messages/new', (req, res)=>{
    const dbMess = req.body
    Messages.create(dbMess, (err, data) =>{
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

