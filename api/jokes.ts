import { JOKE2_API_URL, apiJoke2Key } from "../config/constants.js";
import { JokeResponse, JokeResponse2 } from "types/types";

export async function getJoke(): Promise<JokeResponse> {
    const object = {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    };
    try {
        const response = await fetch("https://icanhazdadjoke.com/", object);
        const jokeData: JokeResponse = await response.json();
        return jokeData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getJoke2(): Promise<JokeResponse2> {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiJoke2Key,
            "X-RapidAPI-Host": "manatee-jokes.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(JOKE2_API_URL, options);
        const jokeData = await response.json();
        return jokeData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
