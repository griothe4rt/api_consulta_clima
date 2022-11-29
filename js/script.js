// Variáveis e seleção de elementos
const apiKey = "bfaf57bc348d9ae8bb12c764dda68827"; // define API_KEY do clima

// Mapeia elementos HTML da página.
const cityInput = document.querySelector("#city-input"); // mapeia o input da cidade
const searchBtn = document.querySelector("#search"); // mapeia botão de busca da cidade
const cityElement = document.querySelector("#city") // mapeia cidade
const tempElement = document.querySelector("#temperature span") // mapeia temperatura
const descElement = document.querySelector("#description") // mapeia descrição
const weatherIconElement = document.querySelector("#weather-icon") // mapeia icone de clima
const countryElement = document.querySelector("#country") // mapeia país
const humidityElement = document.querySelector("#humidity span") // mapeia umidade
const windElement = document.querySelector("#wind span") // mapeia velocidade do vento

const weatherContainer = document.querySelector("#weather-data"); //seleciona todo elemento do container

// Funções

//consulta API de clima
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br` //faz a chamada da API

    const res = await fetch(apiWeatherURL) //espera receber os dados da API
    const data = await res.json() //transforma a resposta da API de JSON pra objeto JavaScript

    return data;
}


// chama a função pra cidade digitada
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name; // troca elemento pro nome da cidade digitada
    tempElement.innerText = parseInt(data.main.temp); // troca elemento pra temperatura
    descElement.innerText = data.weather[0].description; // troca elemento pra descrição do clima
    weatherIconElement.setAttribute(
        "src", 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        ) // trocando elemento SRC por uma string dinamica
    countryElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`) // consulta bandeira do país na API
    humidityElement.innerText = `${data.main.humidity}%`; // troca elemento pra umidade do ar
    windElement.innerText = `${data.wind.speed}km/h` // troca elemento pra velocidade do ar

    weatherContainer.classList.remove("hide") //remove classe "Hide"
}

// Eventos

//define evento ao clicar no botão de pesquisa
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value; //captura qual a cidade digitada

    showWeatherData(city);
});

// define evento ao apertar a tecla "Enter"
cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {
        const city = e.target.value
        showWeatherData(city);
    }
})