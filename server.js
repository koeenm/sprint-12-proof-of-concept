import express from "express"
import fetchJson from './helpers/fetch-json.js'

const propertyId = '301922918';
import {BetaAnalyticsDataClient} from '@google-analytics/data';
const analyticsDataClient = new BetaAnalyticsDataClient();

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 6090)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// Hier kan je alle properties vinden
// https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
app.get('/', async (request, response) => {
  const [apiDataCountries] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2024-01-01',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'country',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });
  
  const [apiDataBrowser] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2020-01-01',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'browser',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  });
  response.render('home.ejs', 
    {country: apiDataCountries,
      browser : apiDataBrowser
  })
})


