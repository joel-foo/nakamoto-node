import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/api'

const app = express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
