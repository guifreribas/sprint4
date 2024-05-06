"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let actualJoke = "";
let jokeValorationData = { joke: "", score: 0, date: new Date() };
const jokesValorations = [];
const $nextJokeBtn = document.getElementById("nextJokeBtn");
$nextJokeBtn === null || $nextJokeBtn === void 0 ? void 0 : $nextJokeBtn.addEventListener("click", () => {
    if ((jokeValorationData === null || jokeValorationData === void 0 ? void 0 : jokeValorationData.score) !== 0) {
        jokesValorations.push(jokeValorationData);
        jokeValorationData = { joke: "", score: 0, date: new Date() };
        console.log({ jokesValorations });
    }
    paintJoke();
});
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const object = {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        };
        try {
            const response = yield fetch("https://icanhazdadjoke.com/", object);
            const jokeData = (yield response.json());
            actualJoke = jokeData.joke;
            return jokeData;
        }
        catch (error) {
            console.log(error);
        }
    });
}
function paintJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        const jokeData = yield getJoke();
        const $joke = document.getElementById("joke");
        if ($joke && jokeData) {
            $joke.textContent = jokeData.joke;
            console.log(jokeData.joke);
        }
    });
}
function jokeValoration(score) {
    jokeValorationData = {
        joke: actualJoke,
        score,
        date: new Date(),
    };
}
paintJoke();
