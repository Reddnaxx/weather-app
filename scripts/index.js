import WeatherService from "./WeatherService.js";
import ValidationService from "./ValidationService.js";
import {latitudeValidator, longitudeValidator} from "./inputValidators.js";
import Widget from "../components/widget.js";

const submitBtn = document.getElementById('submit-btn');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const loadComponent = document.getElementById('load');

const latitudeError = document.getElementById('lat-err');
const longitudeError = document.getElementById('lon-err');
const dataError = document.getElementById('dta-err');

const widgetComponent = document.getElementById('widget');
const showMapButton = document.getElementById('show-map');
const pagesList = document.getElementById('pages');
const dataComponent = document.getElementById('data');

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
    Widget.update(widgets[currentPage - 1])
    for (const page of pagesList.children) {
        page.className = 'data__page';
    }
    pagesList.children[currentPage - 1].className += ' data__page_active'
}

const addWidget = (data) => {
    for (const widget of widgets) {
        if (data.coord.lon === widget.coord.lon && data.coord.lat === widget.coord.lat) {
            changePage(widgets.indexOf(widget) + 1);
            return;
        }
    }

    widgets.push(new Widget(data))
    const newPage = document.createElement('li');
    newPage.className = 'data__page data__page_active'
    newPage.innerText = `${currentPage + 1}`
    newPage.addEventListener('click', event => {
        changePage(Number(event.target.innerText));
    })
    pagesList.appendChild(newPage)
    changePage(widgets.length)
}

latitudeInput.addEventListener('input', () => {
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

longitudeInput.addEventListener('input', () => {
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
    loadComponent.hidden = false;
    dataComponent.style.display = 'flex'
    widgetComponent.style.visibility = 'hidden';
    event.preventDefault();
    WeatherService.fetchWeather(latitudeInput?.value, longitudeInput?.value)
        .then(data => {
            addWidget(data)
            console.log(data)
        })
        .catch(err => {
            dataError.innerText = handleError(err.status);
        })
        .finally(() => {
            loadComponent.hidden = true;
            widgetComponent.style.visibility = 'visible';
        });
})

showMapButton.addEventListener('click', event => {
    map.hidden = !map.hidden;
    event.target.innerText = map.hidden ? "Показать карту" : "Скрыть карту"
})