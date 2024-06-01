const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const errorElement = document.querySelector('.error');
const weatherElement = document.querySelector('.weather');
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "2f35a712f68c5e371c1264c165ed4585";
let timeout = null;

// Load the last searched city from localStorage and check its weather
document.addEventListener('DOMContentLoaded', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        searchBox.value = lastCity;
        checkWeather(lastCity);
    }
});

async function checkWeather(city){
    try {
        if (!city) {
            throw new Error("Please enter a city name.");
        }
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`City not found (${response.status})`);
        }
        const data = await response.json();
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + " km/h";
        const cli = data.weather[0].main;
        document.querySelector('.weather-icon').src = `images/${cli}.png`;
        if(cli=="Haze"){
            document.querySelector('.weather-icon').src = `images/Mist.png`;
        }
        weatherElement.style.display = "block";
        errorElement.style.display = "none";

        // Save the city name to localStorage
        localStorage.setItem('lastCity', city);
    } catch (error) {
        errorElement.style.display = "block";
        errorElement.innerHTML = error.message;
        weatherElement.style.display = "none";
    }
}

function debounce(func, delay) {
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function handleSearch() {
    const city = searchBox.value.trim();
    checkWeather(city);
}

searchBtn.addEventListener('click', handleSearch);

searchBox.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    } else {
        debounce(handleSearch, 300)();
    }
});
