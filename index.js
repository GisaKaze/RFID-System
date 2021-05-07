const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")
const socketIo = require("socket.io")
const cardRouter = require("./routes/cards.route")
const transactionRouter = require("./routes/transaction.route")
const app = express();

var server = require("http").Server(app)
const path = require('path')
const { getAllTransactions } = require("./controllers/transactionController")
const io = socketIo(server)
require("./database/index.js")

app.use(cors({}))
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

app.set("IO", io)
app.use(express.static(path.join(__dirname,'public')))

app.use("/cards", cardRouter)
app.use("/transactions", transactionRouter)


let interval;
io.on("connection", (socket)=>{
    console.log(`[${socket.id}] A new socker connected to the socket server`)
    interval = setInterval(()=>getAllData(socket),1000)
    socket.on('disconnect',()=>{
        clearInterval(interval)
    })
})

const getAllData = async (socket)=>{
   let {data} = await getAllTransactions();
   socket.emit("getAllTransaction",{data})
}
const port = 4000
server.listen(port, function () {
    console.log(`Server running on port http://localhost:${port}`)
});