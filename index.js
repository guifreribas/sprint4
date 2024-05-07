import { WEATHER_API_URL, apiKey } from "./config/constants.js";
let actualJoke = "";
let jokeValorationData = { joke: "", score: 0, date: new Date() };
const jokesValorations = [];
const $nextJokeBtn = document.getElementById("nextJokeBtn");
$nextJokeBtn?.addEventListener("click", () => {
    if (jokeValorationData?.score !== 0) {
        jokesValorations.push(jokeValorationData);
        jokeValorationData = { joke: "", score: 0, date: new Date() };
    }
    paintJoke();
});
async function getJoke() {
    const object = {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    };
    try {
        const response = await fetch("https://icanhazdadjoke.com/", object);
        const jokeData = await response.json();
        actualJoke = jokeData.joke;
        return jokeData;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
async function paintJoke() {
    const jokeData = await getJoke();
    const $joke = document.getElementById("joke");
    if ($joke && jokeData) {
        $joke.textContent = jokeData.joke;
        console.log(jokeData.joke);
    }
}
export function jokeValoration(score) {
    jokeValorationData = {
        joke: actualJoke,
        score,
        date: new Date(),
    };
}
async function getWeather() {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
    };
    try {
        const response = await fetch(WEATHER_API_URL, options);
        const weather = await response.json();
        return weather;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
async function paintWeather() {
    const { location, current } = await getWeather();
    const $body = document.querySelector("body");
    const $weatherArticle = document.querySelector(".weather");
    if (!$body || !$weatherArticle)
        return;
    $weatherArticle.innerHTML = `
            <img class="weather__icon" src=${current.condition.icon} alt="Actual weather icon">
            <p>${location.name}</p>
            <div class="weather__divider"></div>
            <p class="weather__temp">${current.temp_c}ºC</p>
        `;
}
paintJoke();
paintWeather();
