let slctbox = document.querySelector('.slctbox');
let countryNameElems = document.querySelectorAll('.country-name');

// fetch all supported countries
fetch('https://api.covid19api.com/countries')
.then(res => res.json())
.then((data) => {
  let SortedCounties = data.sort((a,b)=> b.Country - a.Counrtry );
  SortedCounties.forEach(country=>{
    slctbox.innerHTML += `
      <option value="${country.Slug}">${country.Country}</option>
    `
  })
});

slctbox.addEventListener('change', (e)=>{
  console.log(e.target.value);
  CountryCases(e.target.value);
  GetCaseTypeForCountry('confirmed', e.target.value);
  GetCaseTypeForCountry('deaths', e.target.value);
  GetCaseTypeForCountry('recovered', e.target.value);
})


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

// countery cases
function CountryCases(country) {
  getData(`https://api.covid19api.com/dayone/country/${country}`).then(cases=>{
    ChartSetupForCountry(cases[cases.length - 1]);
  }).then(()=>{
    countryNameElems.forEach(el=>{
      el.textContent = country;
    })
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

// chart setup for country data before drawing
function ChartSetupForCountry(data){
  let countryCan = document.getElementById('country').getContext('2d');
  let labels = ['Active', 'Confirmed', 'Deaths', 'Recovered'];
  let values = [data.Active, data.Confirmed, data.Deaths, data.Recovered];
  let colors = ['#00f', '#fd9d12', '#ed1230', '#0080aa'];

  // draw chart
  drawChart(countryCan, labels, `${data.Date}`, values, colors, 'pie');
}

// egypt cases type like confirmed, deaths and recovered.
function GetCaseTypeForCountry(type, country){
  let from = new Date(Date.now() - (24*60*60*1000*10)).toISOString().slice(0, 10) + 'T00:00:00Z';
  let to = new Date(Date.now()).toISOString().slice(0, 10) + 'T00:00:00Z';

  getData(`https://api.covid19api.com/country/${country}/status/${type}?from=${from}&to=${to}`).then(data=>{
    ChartSetupForCountryTypes(data, type);
  })
}

// chart setup for egypt cases type data before drawing
function ChartSetupForCountryTypes(data, type, counrty) {
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
  drawChart(cofirmedCan, labels, `${type} cases`, values, colors, 'line');
}

GlobalCases();
CountryCases('egypt');
GetCaseTypeForCountry('confirmed', 'egypt');
GetCaseTypeForCountry('deaths', 'egypt');
GetCaseTypeForCountry('recovered', 'egypt');
