function drawChart(Canvas, labels, label, data, backgroundColor, type) {
  let myChart = new Chart(Canvas, {
    type: type || 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor
      }]
    },
    options: {
      scales: {
        yAxes: {
          gridLines: {
            display:false
          }
        },
        xAxes :{
          gridLines: {
            display:false
          }
        }
      },
      legend: {
        labels: {
          fontColor: '#ddd'
        }
      }
    }
  });
}
