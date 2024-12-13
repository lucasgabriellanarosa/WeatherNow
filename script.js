const KEY = 'e8d9013cb7bea9b42495afa1de3e8dbe'

const searchBtn = document.getElementById("searchBtn")
const searchQuery = document.getElementById("searchQuery")

// Info Updates
const tempCityInfo = document.getElementById("info_temp_city")
const humidityInfo = document.getElementById("info_humidity")
const windInfo = document.getElementById("info_wind")

searchBtn.addEventListener("click", () => {

    const queryValue = searchQuery.value
    console.log("Procurando por: " + queryValue)

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryValue}&appid=${KEY}`)
    .then(res => res.json())
    .then(data => {
        const celsius = kelvinToCelsius(data.main.temp)
        tempCityInfo.innerText = celsius + "°C - " + data.name

        humidityInfo.innerText = `Humidade: ` + data.main.humidity + `%`
        windInfo.innerText = `Velocidade do Vento: ` + data.wind.speed + 'km/h'
    })
})


const kelvinToCelsius = (kelvin) => {
    celsius = kelvin - 273.15
    return parseFloat(celsius.toFixed(1));
}