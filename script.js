document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNamedisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables

    getWeatherBtn.addEventListener('click', async()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        /*  if u making request from server you must have to remember two mantras;-
                    1.it may throw an error
                    2.server/db is always in another continent */

        try {
            const data = await fetchdata(city);
            displaydata(data); 
            
        } catch (error) {
            showError();
        }

    })

    async function fetchdata(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log('RESPONSE', response);

        if(!response.ok){
            throw new Error("City Not found!!")
        }

        let data = await response.json();
        return data;
    }

    function displaydata(data){
        console.log(data);

        const {name, main, weather} = data;
        cityNamedisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}C Feels Like : ${main.feels_like}C`
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`

        //unlock the display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')

       
        
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})