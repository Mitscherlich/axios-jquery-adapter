import { createServer, Server } from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'

const app = express()
const upload = multer({ dest: path.resolve(__dirname, './upload') })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

let server: Server

beforeAll((done) => {
  app.get('/echo/:content', (req, res) => {
    res.status(200).send(req.params.content)
  })

  app.get('/echo', (req, res) => {
    res.status(200).send(req.query?.content)
  })

  app.post('/echo', upload.none(), (req, res) => {
    res.status(200).send(req.body)
  })

  server = createServer(app).listen(3000, '0.0.0.0', done)
})

afterAll((done) => {
  server.close(done)
})
