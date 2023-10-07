import express from 'express'
import { createServer } from 'http'
import cors from 'cors';
import { Server } from 'socket.io'

const PORT = 3000

const { json } = express;

const app = express()
app.use(json())
app.use(cors())
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

// Communication with Client Code
io.on('connection', (socket) => {
    console.log('a client connected')
})

// Communication with Fidel
app.post('/api/webhooks/:type', (req, res, next) => {
    io.emit(req.params.type, req.body)

    res.status(200).end()
})

server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})