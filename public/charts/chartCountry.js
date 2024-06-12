const country = document.getElementById('countryChart');
function createCountryChart() {
  const countryData = <%- JSON.stringify(country.rows) %>;
  // Initialize variables for "Other" group
  let otherValue = 0;

  // Arrays to store labels and data
  const labels = [];
  const data = [];

  // Iterate through the data rows
  countryData.forEach(function(row) {
    const value = parseInt(row.metricValues[0].value);
    const label = row.dimensionValues[0].value;

    if (value < 13) {
      // Aggregate values for "Other" group
      otherValue += value;
    } else {
      // Add label and value to respective arrays
      labels.push(label);
      data.push(value);
    }
  });

  // Add "Other" group if it has data
  if (otherValue > 0) {
    labels.push('Other');
    data.push(otherValue);
  }

  // Create the chart
  new Chart(country, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Aantal keer bezocht',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
createCountryChart();
