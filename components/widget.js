import {setMapCenter} from "../scripts/MapService.js";

export default class Widget {
    constructor(data) {
        this.region = data.name;
        this.temperature = data.main.temp.toFixed(1);
        this.coord = data.coord;
        this.weather = data.weather[0].description;
        this.icon = data.weather[0].icon
        this.wind = data.wind.speed
        this.humidity = data.main.humidity
        this.time = new Date(data.dt * 1000)
    }

    static update = (widget) => {
        const temperatureComponent = document.getElementById('temp');
        const regionComponent = document.getElementById('region');
        const weatherComponent = document.getElementById('weather');
        const iconComponent = document.getElementById('weather-img');
        const windComponent = document.getElementById('wind');
        const humidityComponent = document.getElementById('humidity');
        const timeComponent = document.getElementById('time');

        const time = widget.time.toLocaleTimeString().substring(0, 5)

        regionComponent.innerText = widget.region || 'Земля';
        temperatureComponent.innerText = `${widget.temperature}°C`;
        weatherComponent.innerText = widget.weather;
        windComponent.innerText = `${widget.wind} м/с`;
        humidityComponent.innerText = `${widget.humidity}%`;
        timeComponent.innerText = time;
        iconComponent.src = `https://openweathermap.org/img/wn/${widget.icon}@2x.png`;
        setMapCenter(widget.coord.lat, widget.coord.lon);
    }
}