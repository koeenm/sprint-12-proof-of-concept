import express from "express"
import fetchJson from './helpers/fetch-json.js'
const app = express()

// Importeren van geheime data
import 'dotenv/config'
console.log(`Hello ${process.env.GoogleData}`)


function main(propertyId = '301922918') {
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');
  const analyticsDataClient = new BetaAnalyticsDataClient();


  async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    console.log('Report result:');
    response.rows.forEach((row) => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }
  runReport();
}



app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 6090)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

app.get('/', (request, response) => {
  response.render('index.ejs')
})


