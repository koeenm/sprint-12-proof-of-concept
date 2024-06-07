import express from "express"
import fetchJson from './helpers/fetch-json.js'
const app = express()

// Importeren van geheime data
import 'dotenv/config'

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 6090)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

app.get('/', (request, response) => {
  response.render('home.ejs')
})


