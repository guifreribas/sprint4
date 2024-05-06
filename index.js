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
const $nextJokeBtn = document.getElementById("nextJokeBtn");
$nextJokeBtn === null || $nextJokeBtn === void 0 ? void 0 : $nextJokeBtn.addEventListener("click", () => {
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
            const jokeData = yield response.json();
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
paintJoke();
