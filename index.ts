type JokeResponse = {
    id: string;
    joke: string;
    status: number;
};
const $nextJokeBtn = document.getElementById("nextJokeBtn") as HTMLButtonElement;
$nextJokeBtn?.addEventListener("click", () => {
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
        const jokeData = await response.json();
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

paintJoke();
