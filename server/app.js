import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

const app = express()

app.use(express.static(__dirname + '/public/'))

app.listen(process.env.PORT)
