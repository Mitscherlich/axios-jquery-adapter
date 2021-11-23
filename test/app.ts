import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

const app = express()
const upload = multer({ dest: path.resolve(__dirname, './upload') })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

app.get('/echo', (req, res) => {
  res.status(200).send(req.query?.text)
})

app.put('/sleep/:ms', async (req, res) => {
  await sleep(parseInt(req.params.ms))

  res.status(200)
})

app.post('/echo', upload.none(), (req, res) => {
  res.status(200).send(req.body)
})

export default app
