'use strict';

( function () {
  var HALF_WIDTH_PIN = 25;
  var HEIGHT_PIN = 70;
  
  var renderPins = function (item) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPin = pinTemplate.cloneNode(true);
    mapPin.querySelector('img').setAttribute('src', item.author.avatar);
    mapPin.setAttribute('style', 'left: ' + (item.location.x - HALF_WIDTH_PIN) + 'px; ' + 'top:' + (item.location.y - HEIGHT_PIN) + 'px;');
    mapPin.setAttribute('alt', item.offer.title);
    return mapPin;
  };

  window.pin.renderPins = renderPins;
}) ();
