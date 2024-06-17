import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()
const fdr_site = ('https://fdnd-agency.directus.app/items/frd_site')
const frd_scans = ('https://fdnd-agency.directus.app/items/frd_scans')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (request,response) => {
  fetchJson(fdr_site).then((scanSites) => {
    response.render('index', {
      scanSite: scanSites.data
    })
  })
})

app.get('/:siteTitle/', (request, response) => {
  fetchJson(frd_scans).then((scanDetails) => {
    response.render('detail', {
      scanDetail: scanDetails.data
    })
  })
})

app.set('port', process.env.PORT || 8080)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})