let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [52.029222, 47.830666],
    zoom: 12,
    controls: []
  });

  const coords = [
    [52.010892, 47.809866],
    [52.028943, 47.831588],
    [52.013070, 47.823206],
    [52.028342, 47.781668]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/svg/marker.svg',
    iconImageSize: [30, 42],
    iconImageOffset: [-3, -42]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');

  myMap.controls.add('zoomControl', {
    float: 'none',
    position: {
        right: 40,
        top: 5
    }
  });
}

ymaps.ready(init);