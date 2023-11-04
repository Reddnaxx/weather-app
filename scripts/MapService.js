ymaps.ready(init);

var myMap;

function init() {
    myMap = new ymaps.Map('map', {
        center: [0, 0], // Москва
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });
}

export const setMapCenter = (lat, lon) => {
    myMap.setCenter([lat, lon]);
}