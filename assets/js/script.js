// API key for OpenWeatherMap
var apiKey = "c6ed5d250e6cffe2e326fd686c662f80";
var searchFormEl = document.querySelector('#search-form');

// // DOM elements
var inputEl = document.querySelector('#input-city');
var searchBtn = document.querySelector('.btn-el');
var bigCardEl = document.querySelector('#big-card');
var cardsEl = document.querySelector('.card-1')

// Event handler for form submission
var handleFormSubmit = function (event) {
  event.preventDefault();
  var city = inputEl.value.trim();
  // Clear previous weather data
  bigCardEl.textContent = '';
  cardsEl.textContent = '';
  if (city) {
    fiveDayForecast(city);
    getCurrentWeather(city);
    console.log(city);
  } else {
    alert('Please enter a city');
  }
}

// Fetch current weather data for a given city
var getCurrentWeather = function (city) {
  let currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';
  fetch(currentWeatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            displayCurrentWeather(data);
            console.log(data);
          })
      }
    })
}

// Fetch five-day forecast for a given city
var fiveDayForecast = function (cityParameter) {
  var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityParameter + '&appid=' + apiKey + '&units=imperial';
  fetch(queryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            displayWeatherCards(data);
            console.log(data);
          })
      } else {
        alert('Error' + response.statusText);
      }
    }).catch(function (error) {
      alert('Unable to connect to Weather Server');
    })
}

// Display current weather data on the page
var displayCurrentWeather = function (currentWeather) {

  var today = dayjs().format('DD-MMM-YY');
  var titleEl = document.createElement('h1');


  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  // Set text content for weather details
  tempEl.textContent = 'Temp: ' + currentWeather.main.temp + ' °F';
  windEl.textContent = 'Wind: ' + currentWeather.wind.speed + ' MPH';
  humidityEl.textContent = 'Humidity: ' + currentWeather.main.humidity + ' %';
  titleEl.textContent = inputEl.value + ' ' + '(' + today + ')';

  // Add weather icons based on the weather condition
  if (currentWeather.weather[0].main === "Clouds") {

    let cloudsIcon = document.createElement('í');
    cloudsIcon.style.color = '#302ae5';
    cloudsIcon.style.margin = '10px';
    cloudsIcon.classList.add('fa-cloud-sun', 'fa-xl', 'fa-solid');
    titleEl.append(cloudsIcon);

  } else if (currentWeather.weather[0].main === "Clear") {

    let clearIcon = document.createElement('í');
    clearIcon.style.color = '#c6de17';
    clearIcon.style.margin = '10px';
    clearIcon.classList.add('fa-solid', 'fa-sun', 'fa-xl');
    titleEl.append(clearIcon);

  } else if (currentWeather.weather[0].main === "Drizzle") {

    let drizzleIcon = document.createElement('í');
    drizzleIcon.style.color = '#255ec1';
    drizzleIcon.style.margin = '10px';
    drizzleIcon.classList.add('fa-solid', 'fa-cloud-rain', 'fa-xl');
    titleEl.append(drizzleIcon);

  } else if (currentWeather.weather[0].main === "Mist") {

    let mistIcon = document.createElement('í');
    mistIcon.style.color = '#315d68';
    mistIcon.style.margin = '10px';
    mistIcon.classList.add('fa-solid', 'fa-cloud', 'fa-xl');
    titleEl.append(mistIcon);

  } else if (currentWeather.weather[0].main === 'Rain') {
    console.log('Rain')
    let rainIcon = document.createElement('í')
    rainIcon.style.color = '#abafb5';
    rainIcon.style.margin = '10px';
    rainIcon.classList.add('fa-solid', 'fa-cloud-showers-heavy', 'fa-xl');
    titleEl.append(rainIcon);

  }

  bigCardEl.append(titleEl, tempEl, windEl, humidityEl);
  bigCardEl.classList = 'big-card';
}

// Display five-day forecast on the page
var displayWeatherCards = function (forecast) {



  for (var i = 0; i < forecast.list.length; i += 8) {
    console.log(forecast.list[i]);

    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    let cardDiv = document.createElement('div');
    let cardTitle = document.createElement('h1');

    // Set text content for forecast details
    let dt_txt = forecast.list[i].dt_txt;
    var date = dt_txt.split(" ")[0];
    cardTitle.textContent = date;

    var temp = forecast.list[i].main.temp;
    tempEl.textContent = 'Temp: ' + temp + ' °F';
    var humidity = forecast.list[i].main.humidity;
    humidityEl.textContent = 'Humidity: ' + humidity + ' %';
    var wind = forecast.list[i].wind.speed;
    windEl.textContent = 'Wind: ' + wind + ' MPH';

    // Add weather icons based on the weather condition
    if (forecast.list[i].weather[0].main === "Clouds") {

      let cloudsIcon = document.createElement('í');
      cloudsIcon.style.color = '#302ae5';
      cloudsIcon.style.margin = '10px';
      cloudsIcon.classList.add('fa-cloud-sun', 'fa-xl', 'fa-solid');
      cardTitle.append(cloudsIcon);

    } else if (forecast.list[i].weather[0].main === "Clear") {

      let clearIcon = document.createElement('í');
      clearIcon.style.color = '#c6de17';
      clearIcon.style.margin = '10px';
      clearIcon.classList.add('fa-solid', 'fa-sun', 'fa-xl');
      cardTitle.append(clearIcon);

    } else if (forecast.list[i].weather[0].main === "Drizzle") {

      let drizzleIcon = document.createElement('í');
      drizzleIcon.style.color = '#255ec1';
      drizzleIcon.style.margin = '10px';
      drizzleIcon.classList.add('fa-solid', 'fa-cloud-rain', 'fa-xl');
      cardTitle.append(drizzleIcon);

    } else if (forecast.list[i].weather[0].main === "Mist") {

      let mistIcon = document.createElement('í');
      mistIcon.style.color = '#315d68';
      mistIcon.style.margin = '10px';
      mistIcon.classList.add('fa-solid', 'fa-cloud', 'fa-xl');
      cardTitle.append(mistIcon);

    } else if (forecast.list[i].weather[0].main === 'Rain') {
      console.log('Rain')
      let rainIcon = document.createElement('í')
      rainIcon.style.color = '#abafb5';
      rainIcon.style.margin = '10px';
      rainIcon.classList.add('fa-solid', 'fa-cloud-showers-heavy', 'fa-xl');
      cardTitle.append(rainIcon);

    }


    cardDiv.append(cardTitle, tempEl, humidityEl, windEl);
    cardsEl.appendChild(cardDiv);

  }
}


// Add event listener to the search button
searchBtn.addEventListener('click', handleFormSubmit);