// API KEY
const KEY = 'e8d9013cb7bea9b42495afa1de3e8dbe'

// Main
const mainContainer = document.getElementById("main_container")

// SEARCH
const searchBtn = document.getElementById("searchBtn")
const searchQuery = document.getElementById("searchQuery")

// INFO
const infoImg = document.getElementById("info_img")
const tempCityInfo = document.getElementById("info_temp_city")
const dateInfo = document.getElementById("info_date")
const humidityInfo = document.getElementById("info_humidity")
const windInfo = document.getElementById("info_wind")

// FORECAST
const forecastDayOne = document.getElementById("forecast_dayOne")
const forecastDayOneImg = document.getElementById("forecast_dayOne_img")
const forecastDayTwo = document.getElementById("forecast_dayTwo")
const forecastDayTwoImg = document.getElementById("forecast_dayTwo_img")
const forecastDayThree = document.getElementById("forecast_dayThree")
const forecastDayThreeImg = document.getElementById("forecast_dayThree_img")


const dataSection = document.getElementById("data_section")

// Get the background color by the weather
const getBackground = (weather) => {
    switch (weather) {
        case 'Thunderstorm':
            mainContainer.style.backgroundImage = `linear-gradient(90deg, #B7A807, #B85C00)`
            break;
        case 'Drizzle':
            mainContainer.style.backgroundImage = `linear-gradient(90deg, gray, black)`
            break;
        case 'Rain':
            mainContainer.style.backgroundImage = `linear-gradient(90deg, #001A84, #02001C)`
            break;
        case 'Snow':
            mainContainer.style.backgroundImage = `linear-gradient(90deg, lightblue, rgb(127, 180, 197))`
            break;
        case 'Clear':
            mainContainer.style.backgroundImage = `linear-gradient(90deg, #001A84, #B85C00)`
            break;
        case 'Clouds':
            mainContainer.style.backgroundImage = `linear-gradient(90deg, rgb(122, 176, 194), rgb(88, 88, 88))`
            break;

        default:
            mainContainer.style.backgroundImage = `linear-gradient(90deg, rgb(48, 48, 48), black)`
            break;
    }
}

// Insert the data got from the API into the website (info section)
const insertInfo = (data) => {
    getBackground(data.list[0].weather[0].main)
    dataSection.innerHTML = `
        <section class="info_section">
        <div>
            <img id="info_img" class="weatherIcon" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png">

            <div class="top_info">
                <p id="info_temp_city">${data.list[0].main.temp}°C - ${data.city.name}</p>
                <p id="info_date"></p>
            </div>

        </div>

        <div class="bottom_info">
            <p id="info_humidity">Humidade: ${data.list[0].main.humidity}%</p>
            <p id="info_wind">Velocidade do Vento: ${data.list[0].wind.speed}m/s</p>
        </div>
    </section>

    <ul class="forecast_section">
        <li>
            <img class="weatherIcon" id="forecast_dayOne_img" src="https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png">
            <p id="forecast_dayOne">${data.list[8].dt_txt.replace(/\s\d{1,2}:\d{2}:\d{2}/, '')} <br>${data.list[8].main.temp}</p>
        </li>
        <li>
            <img class="weatherIcon" id="forecast_dayTwo_img" src="https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png">
            <p id="forecast_dayTwo">${data.list[16].dt_txt.replace(/\s\d{1,2}:\d{2}:\d{2}/, '')} <br>${data.list[16].main.temp}</p>
        </li>
        <li>
            <img class="weatherIcon" id="forecast_dayThree_img" src="https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}.png">
            <p id="forecast_dayThree">${data.list[24].dt_txt.replace(/\s\d{1,2}:\d{2}:\d{2}/, '')} <br>${data.list[24].main.temp}</p>
        </li>
    </ul>
    `
}

// Get the user location when he start using the website
const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`)
                .then(res => res.json())
                .then(data => {
                    getForecast(data.name)
                })
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Você negou o acesso à localização. Não podemos fornecer o clima local.");
                    break;
                default:
                    alert("Ocorreu um erro desconhecido.");
                    break;
            }
        }
    );
}


// Forecast for the next days
const getForecast = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=25&units=metric&appid=${KEY}`)
        .then(res => {
            if (!res.ok) {
                alert("Cidade não encontrada!")
                throw new Error(`Erro: ${res.status} - ${res.statusText || "Cidade não encontrada"}`);
            }
            setIsLoading("true");
            return res.json();
        })
        .then(data => {
            setIsLoading("false", data); 
        })
}


// Search function
searchBtn.addEventListener("click", () => {
    const queryValue = searchQuery.value

    if (queryValue == ``) {
        alert("É necessário escrever o nome de alguma cidade!")
    } else {
        getForecast(queryValue)
    }
})

let isLoading = true

const setIsLoading = (trueOrFalse, data) => {
    isLoading = trueOrFalse === "true";
    checkLoading(data)
}

const checkLoading = (data) => {
    if (isLoading) {
        dataSection.innerHTML = `
        <h1>Carregando...</h1>
        `
    } else {
        insertInfo(data)
    }
}


// Function to start the application
const initApp = () => {
    checkLoading(isLoading)
    getUserLocation()
}


initApp()