async function getData(endpoint) {
  let data = await fetch(endpoint)
  .then(res => res.json())
  .then(data => data);
  return data;
}

// global cases
function GlobalCases() {
  getData('https://api.covid19api.com/summary').then(cases=>{
    ChartSetupForGlobal(cases.Global);
  });
}

// egypt cases
function EgyptCases() {
  getData('https://api.covid19api.com/dayone/country/egypt').then(cases=>{
    ChartSetupForEgypt(cases[cases.length - 1]);
  })
}


// cahrt setup for global data befor drawing
function ChartSetupForGlobal(data){
  let globalCan = document.getElementById('global').getContext('2d');
  let labels = [];
  let values = [];
  let colors = [];
  let bgs = [];
  for (label in data){
    colors.push(`hsl( ${Math.floor(Math.random()*255)}, 100%, 75%)`);
    labels.push(label);
    values.push(data[label]);
  }
  // draw chart
  drawChart(globalCan, labels, 'Global Cases', values, colors);
}

// chart setup for egypt data before drawing
function ChartSetupForEgypt(data){
  let egyptCan = document.getElementById('egypt').getContext('2d');
  let labels = ['Active', 'Confirmed', 'Deaths', 'Recovered'];
  let values = [data.Active, data.Confirmed, data.Deaths, data.Recovered];
  let colors = ['#00f', '#fd9d12', '#ed1230', '#0080aa'];

  // draw chart
  drawChart(egyptCan, labels, `Egypt - ${data.Date}`, values, colors, 'pie');
}

// egypt cases type like confirmed, deaths and recovered.
function GetCaseTypeForEgypt(type){
  let from = new Date(Date.now() - (24*60*60*1000*10)).toISOString().slice(0, 10) + 'T00:00:00Z';
  let to = new Date(Date.now()).toISOString().slice(0, 10) + 'T00:00:00Z';

  getData(`https://api.covid19api.com/country/egypt/status/${type}?from=${from}&to=${to}`).then(data=>{
    ChartSetupForEgyptTypes(data, type);
  })
}

// chart setup for egypt cases type data before drawing
function ChartSetupForEgyptTypes(data, type) {
  let cofirmedCan = document.getElementById(type).getContext('2d');
  let labels = [];
  let values = [];
  let colors = [];
  data.forEach(d =>{
    labels.push(d.Date.slice(0, 10));
    values.push(d.Cases);
    colors.push(`hsl(${Math.floor(Math.random() * 255)}, 100%, 75%)`);
  })
  // draw chart
  drawChart(cofirmedCan, labels, `Egypt - ${type} cases`, values, colors, 'line');
}

GlobalCases();
EgyptCases();
GetCaseTypeForEgypt('confirmed');
GetCaseTypeForEgypt('deaths');
GetCaseTypeForEgypt('recovered');
