//functions
//1.creatingchart
//2.getting data for continent
//3.getting data for country

function createChart(countriesArray, statistics, status) {
  const canvasElement = document.getElementById("myChart");
  const config = {
    type: "line",
    data: {
      labels: countriesArray,
      datasets: [
        {
          label: `Number of ${status} `,
          data: statistics,
        },
      ],
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          steps: 10,
        },
      },
    },
  };

  const chart = new Chart(canvasElement, config);
}

const statusButtons = document.createElement("div");
statusButtons.className = "status_Btn";
document.body.appendChild(statusButtons);

const confirmedBtn = document.createElement("button");
confirmedBtn.className = "btn_1";
confirmedBtn.innerText = "Confirmed";
statusButtons.appendChild(confirmedBtn);

const deathBtn = document.createElement("button");
deathBtn.className = "btn_2";
deathBtn.innerText = "Death";
statusButtons.appendChild(deathBtn);

const recoveredBtn = document.createElement("button");
recoveredBtn.className = "btn_3";
recoveredBtn.innerText = "Recovered";
statusButtons.appendChild(recoveredBtn);

const criticalBtn = document.createElement("button");
criticalBtn.className = "btn_4";
criticalBtn.innerText = "Critical";
statusButtons.appendChild(criticalBtn);

const continentsButtons = document.createElement("div");
continentsButtons.className = "continents_Btn";
document.body.appendChild(continentsButtons);

const asiaBtn = document.createElement("button");
asiaBtn.innerText = "Asia";
continentsButtons.appendChild(asiaBtn);

const europeBtn = document.createElement("button");
europeBtn.innerText = "Europe";
continentsButtons.appendChild(europeBtn);

const africaBtn = document.createElement("button");
africaBtn.innerText = "Africa";
continentsButtons.appendChild(africaBtn);

const americasBtn = document.createElement("button");
americasBtn.innerText = "Americas";
continentsButtons.appendChild(americasBtn);

const worldBtn = document.createElement("button");
worldBtn.innerText = "World";
continentsButtons.appendChild(worldBtn);

async function getData(continent, status) {
  const url1 = `https://nameless-citadel-58066.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${continent}`;
  const response = await axios.get(url1);
  const countriesArray = [];
  const countryStatistics = [];
  const countriesCodesArray = [];
  for (let i = 0; i < 50; i++) {
    countriesArray.push(response.data[i].name.common);
    countriesCodesArray.push(response.data[i].cca2);
    console.log(response.data[i].cca2);

    getStatsForCountry(countriesCodesArray[i], status).then(function (data) {
      countryStatistics.push(data);
    });
  }
  await new Promise((r) => setTimeout(r, 400));
  console.log(countriesArray);
  console.log(countryStatistics);

  createChart(countriesArray, countryStatistics, status);
}

async function getStatsForCountry(countryCode, status) {
  const url = `https://nameless-citadel-58066.herokuapp.com/http://corona-api.com/countries/${countryCode}`;

  const res = await axios.get(url);

  return res.data.data.latest_data[status];
}

asiaBtn.addEventListener("click", function () {
  getData("asia", "confirmed");
  confirmedBtn.classList.toggle("active");
  // deathBtn.classList.toggle("active");
  // recoveredBtn.classList.toggle("active");
  // criticalBtn.classList.toggle("active");
});
europeBtn.addEventListener("click", function () {
  getData("europe", "confirmed");
  confirmedBtn.classList.toggle("active");
});
africaBtn.addEventListener("click", function () {
  getData("africa", "confirmed");
  confirmedBtn.classList.toggle("active");
});
americasBtn.addEventListener("click", function () {
  getData("americas", "confirmed");
  confirmedBtn.classList.toggle("active");
});
