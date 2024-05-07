import { getJoke, getJoke2 } from "./api/jokes.js";
import { getWeather } from "./api/weather.js";
import type { JokeValoration } from "./types/types";

let jokeValorationData: JokeValoration = { joke: "", score: 0, date: new Date() };
const jokesValorations: JokeValoration[] = [];

const $nextJokeBtn = document.getElementById("nextJokeBtn") as HTMLButtonElement;
$nextJokeBtn?.addEventListener("click", () => {
    if (jokeValorationData.score !== 0) {
        jokesValorations.push(jokeValorationData);
        jokeValorationData = { joke: "", score: 0, date: new Date() };
    }
    paintJoke();
});

const $emojiButtons = document.querySelectorAll(".emojiBtn");
$emojiButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        jokeValorationData = { ...jokeValorationData, score: index + 1 };
    });
});

async function paintJoke(): Promise<void> {
    const jokeData = await getJoke();
    jokeValorationData.joke = jokeData.joke;
    const $joke = document.getElementById("joke");
    if ($joke && jokeData) {
        $joke.innerHTML = `<p>${jokeData.joke}</p>`;
    }
}

async function paintJoke2(): Promise<void> {
    const jokeData = await getJoke2();
    jokeValorationData.joke = `${jokeData.setup} \n ${jokeData.punchline}`;
    const $joke = document.getElementById("joke");
    if ($joke && jokeData) {
        $joke.innerHTML = `<p>${jokeData.setup}</p>
                            <p>${jokeData.punchline}</p>`;
    }
}

async function paintWeather() {
    const { location, current } = await getWeather();
    const $body = document.querySelector("body");
    const $weatherArticle = document.querySelector(".weather");
    if (!$body || !$weatherArticle) return;
    $weatherArticle.innerHTML = `
            <img class="weather__icon" src=${current.condition.icon} alt="Actual weather icon">
            <p>${location.name}</p>
            <div class="weather__divider"></div>
            <p class="weather__temp">${current.temp_c}ºC</p>
        `;
}

function onRandomPainJoke() {
    Math.round(Math.random()) === 0 ? paintJoke() : paintJoke2();
}

onRandomPainJoke();
paintWeather();
