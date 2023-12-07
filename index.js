import express from 'express'

import notes_router from './api/notes.js'
import user_router from './api/users.js'


const HOST = '127.0.0.1'
const PORT = 3000

let app = express();
app.use(express.json())

app.use('/users', user_router)
app.use('/notes', notes_router)

app.listen(PORT, HOST)
