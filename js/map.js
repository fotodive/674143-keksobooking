'use strict';

(function () {

  var setupOpen = document.querySelector('.map__pin--main');
  var userAddress = document.querySelector('#address');
  var setup = document.querySelector('.map');
  var listElement = document.querySelector('.map__pins');

  var pressEcsPopup = function (evt) {
    if (evt.keyCode === window.error.ESC_KEYCODE) {
      var popups = document.querySelectorAll('.popup');
      for (var y = 0; y < popups.length; y++) {
        popups[y].classList.add('hidden');
      }
    }
  };

  var closeCard = function (e) {
    e.target.parentNode.classList.add('hidden');
  };

  var openCard = function (element, i) {
    element.addEventListener('click', function () {
      var cards = document.querySelectorAll('.map__card');
      if (cards[i].getAttribute('class') === 'map__card popup') {
        cards[i].classList.add('hidden');
      } else {
        cards[i].classList.remove('hidden');
      }
      cards[i].querySelector('.popup__close').addEventListener('click', closeCard);
      document.addEventListener('keydown', pressEcsPopup);
    });
  };

  var documentFragment = function (adverts) {
    for (var i = 0; i < adverts.length; i++) {
      var pinFragment = document.createDocumentFragment();
      pinFragment.appendChild(window.pin.renderPins(adverts[i]));
      listElement.insertBefore(pinFragment, document.querySelector('.map__overlay'));
      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(window.card.renderOffer(adverts[i]));
      setup.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
    }
  };

  var activateMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    setupOpen.removeEventListener('mousedown', onMouseDown);
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(openCard);
    window.form.removeDisabledNotice();
    window.form.activateForm();
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();
    window.backend.loadData(documentFragment, window.error.showErrorMessage);
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var TOPLIMIT = 620;
      var LEFTLIMIT = 1130;
      var newCoordsY = setupOpen.offsetTop - shift.y;
      var newCoordsX = setupOpen.offsetLeft - shift.x;
      if ((newCoordsY > 0) && (newCoordsX > 0) && (newCoordsY < TOPLIMIT) && (newCoordsX < LEFTLIMIT)) {
        setupOpen.style.top = newCoordsY + 'px';
        setupOpen.style.left = newCoordsX + 'px';
      }
      userAddress.value = setupOpen.style.left + ',' + setupOpen.style.top;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      userAddress.value = setupOpen.style.left + ',' + setupOpen.style.top;
      activateMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  setupOpen.addEventListener('mousedown', onMouseDown);

  window.map = {
    pressEcsPopup: pressEcsPopup,
    activateMap: activateMap
  };
}) ();
