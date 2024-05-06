type JokeResponse = {
    id: string;
    joke: string;
    status: number;
};

type JokeValoration = {
    joke: string;
    score: number;
    date: Date;
};

let actualJoke: string = "";
let jokeValorationData: JokeValoration = { joke: "", score: 0, date: new Date() };
const jokesValorations: JokeValoration[] = [];

const $nextJokeBtn = document.getElementById("nextJokeBtn") as HTMLButtonElement;
$nextJokeBtn?.addEventListener("click", () => {
    if (jokeValorationData?.score !== 0) {
        jokesValorations.push(jokeValorationData);
        jokeValorationData = { joke: "", score: 0, date: new Date() };
        console.log({ jokesValorations });
    }
    paintJoke();
});

async function getJoke(): Promise<JokeResponse | undefined> {
    const object = {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    };
    try {
        const response = await fetch("https://icanhazdadjoke.com/", object);
        const jokeData: JokeResponse = await response.json();
        actualJoke = jokeData.joke;
        return jokeData;
    } catch (error) {
        console.log(error);
    }
}

async function paintJoke(): Promise<void> {
    const jokeData = await getJoke();
    const $joke = document.getElementById("joke");
    if ($joke && jokeData) {
        $joke.textContent = jokeData.joke;
        console.log(jokeData.joke);
    }
}

function jokeValoration(score: number): void {
    jokeValorationData = {
        joke: actualJoke,
        score,
        date: new Date(),
    };
}

paintJoke();
