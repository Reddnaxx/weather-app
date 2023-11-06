const FETCH_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather'
const APP_ID = 'cbc8f1668c94c1d3bd409e0c3f9085ab'

export default class WeatherService {
	static fetchWeather = async (lat, lon) => {
		return await fetch(`${FETCH_WEATHER_API}?units=metric&lat=${lat}&lon=${lon}&appid=${APP_ID}&lang=ru`)
			.then(res => res.ok ? res.json() : Promise.reject(res))
	}
}