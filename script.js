const KEY = 'e8d9013cb7bea9b42495afa1de3e8dbe'
// FORECAST: https://api.openweathermap.org/data/2.5/forecast?q=London&appid=e8d9013cb7bea9b42495afa1de3e8dbe
const searchBtn = document.getElementById("searchBtn")
const searchQuery = document.getElementById("searchQuery")

const tempCityInfo = document.getElementById("info_temp_city")
const dateInfo = document.getElementById("info_date")
const humidityInfo = document.getElementById("info_humidity")
const windInfo = document.getElementById("info_wind")


const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
            .then(res => res.json())
            .then(data => {
                const celsius = kelvinToCelsius(data.main.temp)
                tempCityInfo.innerText = celsius + "°C - " + data.name
                humidityInfo.innerText = `Humidade: ` + data.main.humidity + `%`
                windInfo.innerText = `Velocidade do Vento: ` + data.wind.speed + 'm/s'
            })
        }
    );
}

searchBtn.addEventListener("click", () => {

    const queryValue = searchQuery.value
    console.log("Procurando por: " + queryValue)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryValue}&appid=${KEY}`)
    .then(res => res.json())
    .then(data => {

        const celsius = kelvinToCelsius(data.main.temp)
        const timestamp = new Date(data.dt * 1000)
        console.log("timestamp: " + timestamp)
        const date = timestamp.toUTCString()

        tempCityInfo.innerText = celsius + "°C - " + data.name
        dateInfo.innerText = date
        humidityInfo.innerText = `Humidade: ` + data.main.humidity + `%`
        windInfo.innerText = `Velocidade do Vento: ` + data.wind.speed + 'm/s'
        

    })
})


const kelvinToCelsius = (kelvin) => {
    celsius = kelvin - 273.15
    return parseFloat(celsius.toFixed(1));
}

getUserLocation()