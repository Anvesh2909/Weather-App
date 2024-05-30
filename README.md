# Weather-App
Certainly! Here is a GitHub README for the project:

---

# Weather App

A simple weather application that allows users to search for the current weather in any city. The application uses the OpenWeatherMap API to fetch and display weather data. The last searched city is saved in local storage and reloaded when the page is revisited.

## Features

- Search for the current weather by city name.
- Display weather details including temperature, humidity, and wind speed.
- Show weather icons based on the current weather conditions.
- Remember the last searched city using local storage.
- Debounce function to optimize API calls while typing in the search box.
- Handle errors gracefully, displaying user-friendly messages for invalid searches.

## Technologies Used

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## Getting Started

### Prerequisites

You need to have a basic understanding of HTML, CSS, and JavaScript to work with this project.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Anvesh2909/weather-app.git
    ```
2. Open the project directory:
    ```sh
    cd weather-app
    ```
3. Open `index.html` in your favorite browser to view the app.

### Usage

1. Enter the name of a city in the search box.
2. Click the search button or press the Enter key to fetch the weather data.
3. The weather details for the city will be displayed, and the city name will be saved to local storage.
4. If the city name is invalid, an error message will be displayed.

### Code Explanation

#### HTML Elements

- **Input Field**: `.search input` - Where the user types the city name.
- **Search Button**: `.search button` - Button to trigger the search.
- **Error Element**: `.error` - Displays error messages.
- **Weather Element**: `.weather` - Container for displaying weather information.

#### JavaScript Code

1. **API Configuration**:
    ```javascript
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const apiKey = "2f35a712f68c5e371c1264c165ed4585";
    ```

2. **Debounce Function**:
    ```javascript
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    ```

3. **Check Weather Function**:
    ```javascript
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
            weatherElement.style.display = "block";
            errorElement.style.display = "none";

            localStorage.setItem('lastCity', city);
        } catch (error) {
            errorElement.style.display = "block";
            errorElement.innerHTML = error.message;
            weatherElement.style.display = "none";
        }
    }
    ```

4. **Handle Search Function**:
    ```javascript
    function handleSearch() {
        const city = searchBox.value.trim();
        checkWeather(city);
    }
    ```

5. **Event Listeners**:
    ```javascript
    searchBtn.addEventListener('click', handleSearch);

    searchBox.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        } else {
            debounce(handleSearch, 300)();
        }
    });
    ```

6. **Load Last Searched City**:
    ```javascript
    document.addEventListener('DOMContentLoaded', () => {
        const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            searchBox.value = lastCity;
            checkWeather(lastCity);
        }
    });
    ```


