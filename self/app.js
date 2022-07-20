
// const names = require('./4-name')
// const sayHi = require('./5-utils')
// const data = require('./6-alternative')

// console.log(names)

// sayHi(names.john)
// sayHi(names.peter)

// console.log(data)
// console.log(data.singlePerson)

// require('./7-mindre')


/*--------------------------------------------------------------------------------------------------------*/
// const os = require('os')

// const user = os.userInfo()
// console.log(user)

// const currentOs = {
//     name: os.type(),
//     release: os.release(),
//     totalMemory: os.totalmem(),
//     freeMemory: os.freemem()
// }

// console.log(currentOs)

/*--------------------------------------------------------------------------------------------------------*/
// const path = require('path')
// console.log(path.sep)

// const filePath = path.join('/content', 'sub','text.txt')
// console.log(filePath)

// const base = path.basename(filePath)
// console.log(base)

// const absolutePath = path.resolve(__dirname, 'content', 'sub','text.txt')
// console.log(absolutePath)

/*--------------------------------------------------------------------------------------------------------*/
// const http = require('http')

// const server = http.createServer((request, respone)=>{
//     if (request.url === '/') {
//         respone.end('Welcome to home page')
//     }
//     if (request.url === '/about') {
//         respone.end('History')
//     }
//     respone.end(`
//         <h1>Oops<h1>
//         <p>we cannt find</p>
//         <a href='/'> back home </a>
//     `)
//     // console.log(request.url)
//     // respone.write('Welcome to home page')
// })

// server.listen(5000)


/*--------------------------------------------------------------------------------------------------------*/
// const {readFile, writeFile} = require('fs')
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

// // const getText = (path) => {
// //     return new Promise((resolve, reject)=>{
// //         readFile(path,'utf8',(err, data)=>{
// //             if(err) {
// //                 reject(err)
// //             } else{
// //                 resolve(data)
// //             }
// //         })
// //     })
// // }

// // getText('./content/sub/text.txt')
// //     .then(result => console.log(result))
// //     .catch(err => console.log(err))

// // console.log("start")

// const start = async () =>{
//     try {
//         // const first = await getText('./content/sub/text.txt')
//         const first = await readFilePromise('./content/sub/text.txt','utf8')
//         const second = await readFilePromise('./content/sub/second.txt', 'utf8')
//         console.log(first)
//         console.log(second)
//     } catch(error) {
//         console.log(error)
//     }
// }

// start()

/*--------------------------------------------------------------------------------------------------------*/
// const EventEmitter = require('events')

// const customEmitter = new EventEmitter()

// customEmitter.on('responsee', ()=>{
//     console.log(`data received`)
// })

// customEmitter.emit('responsee')

/*--------------------------------------------------------------------------------------------------------*/
// const http = require('http')

// const server = http.createServer()

// server.on('request', (req, res) => {
//     res.end('welcome')
// })

// server.listen(5000)

/*--------------------------------------------------------------------------------------------------------*/

const {createReadStream} = require('fs')

const stream = createReadStream('./content/big.txt', 
    {
        highWaterMark: 90000,
    }
)
 
stream.on('data', (result)=>{
    console.log(result)
}) 

stream.on('error', (err)=>{
    console.log(err)
}) 