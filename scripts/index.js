import WeatherService from "./WeatherService.js";
import ValidationService from "./ValidationService.js";
import {latitudeValidator, longitudeValidator} from "./inputValidators.js";

const submitBtn = document.getElementById('submit-btn');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const loadText = document.getElementById('load');

const latitudeError = document.getElementById('lat-err');
const longitudeError = document.getElementById('lon-err');
const dataError = document.getElementById('dta-err');
const temperature = document.getElementById('temp');

const handleError = (status) => {
    switch (status) {
        case 401:
            return "Не авторизован";
        default:
            return "Ошибка";
    }
}

const checkIfValid = () => {
    submitBtn.disabled = !latitudeInput.value || !longitudeInput.value ||
        latitudeError.innerText || longitudeError.innerText;
}

latitudeInput.addEventListener('input', event => {
    const error = ValidationService.validate(
        {
            value: latitudeInput.value,
            required: latitudeInput.required
        },
        latitudeValidator()
    )
    latitudeError.innerText = error || '';
    checkIfValid();
})

longitudeInput.addEventListener('input', event => {
    const error = ValidationService.validate(
        {
            value: longitudeInput.value,
            required: longitudeInput.required
        },
        longitudeValidator()
    )
    longitudeError.innerText = error || '';
    checkIfValid();
})

submitBtn.addEventListener('click', event => {
    loadText.hidden = false;
    event.preventDefault();
    WeatherService.fetchWeather(latitudeInput?.value, longitudeInput?.value)
        .then(data => {
            temperature.innerText = `${data.main.temp.toFixed(1)}°`
            console.log(data);
        })
        .catch(err => {
            dataError.innerText = handleError(err.status);
            console.log(err);
        })
        .finally(() => {
            loadText.hidden = true;
        });
})