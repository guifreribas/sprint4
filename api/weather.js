import { WEATHER_API_URL, weatherApiKey } from "../config/constants.js";
export async function getWeather() {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": weatherApiKey,
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
