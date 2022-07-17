import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './routes/api'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', routes)

const PORT = process.env.PORT || 3000

//send client page
app.get('/', (req: Request, res: Response) => {
  res.send('hi!')
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
