import WeatherService from "./WeatherService.js";
import ValidationService from "./ValidationService.js";
import {latitudeValidator, longitudeValidator} from "./inputValidators.js";
import Widget from "../components/widget.js";

const submitBtn = document.getElementById('submit-btn');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const loadText = document.getElementById('load');

const latitudeError = document.getElementById('lat-err');
const longitudeError = document.getElementById('lon-err');
const dataError = document.getElementById('dta-err');
const temperature = document.getElementById('temp');

const pagesList = document.getElementById('pages');


const widgets = [];
let currentPage = 0;

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

const changePage = (next) => {
    currentPage = next;
    updateWidget()
}

const updateWidget = () => {
    temperature.innerText = `${widgets[currentPage - 1].temperature}°`
}

const addWidget = (data) => {
    widgets.push(new Widget(data.main.temp))
    changePage(widgets.length)
    const newPage = document.createElement('li');
    newPage.className = 'data__page'
    newPage.innerText = currentPage
    newPage.addEventListener('click', event => {
        changePage(Number(event.target.innerText))
    })
    pagesList.appendChild(newPage)
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
            addWidget(data)
        })
        .catch(err => {
            dataError.innerText = handleError(err.status);
            console.log(err);
        })
        .finally(() => {
            loadText.hidden = true;
        });
})