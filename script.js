// API KEY
const KEY = 'e8d9013cb7bea9b42495afa1de3e8dbe'

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


// Insert the data got from the API into the website (info section)
const insertInfo = (data) => {
    infoImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    tempCityInfo.innerText = data.main.temp + "°C - " + data.name
    humidityInfo.innerText = `Humidade: ` + data.main.humidity + `%`
    windInfo.innerText = `Velocidade do Vento: ` + data.wind.speed + 'm/s'
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
                    insertInfo(data)
                })
        }
    );
}


// Forecast for the next days
const getForecast = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=25&units=metric&appid=${KEY}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.list.length; i += 8) {
                const forecastImgURL = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
                const forecastInnerHTML = `${data.list[i].dt_txt.replace('03:00:00', '')} <br>${data.list[i].main.temp}`;
                switch (i) {
                    case 0:
                        dateInfo.innerText = `${data.list[i].dt_txt.replace('03:00:00', '')}`
                        break;
                    case 8:
                        forecastDayOneImg.src = forecastImgURL
                        forecastDayOne.innerHTML = forecastInnerHTML
                        break;
                    case 16:
                        forecastDayTwoImg.src = forecastImgURL
                        forecastDayTwo.innerHTML = forecastInnerHTML
                        break;
                    case 24:
                        forecastDayThreeImg.src = forecastImgURL
                        forecastDayThree.innerHTML = forecastInnerHTML
                        break;
                    default:
                        break;
                }
            }
        })
}


// Search function
searchBtn.addEventListener("click", () => {

    const queryValue = searchQuery.value
    console.log("Procurando por: " + queryValue)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryValue}&units=metric&appid=${KEY}`)
        .then(res => res.json())
        .then(data => {
            insertInfo(data)
            getForecast(queryValue)
        })
})


// Function to start the application
const initApp = () => {
    getUserLocation()
}


initApp()