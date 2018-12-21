'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'bungalo', 'house', 'palace'];
var TYPES_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var CHECKS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var HALF_WIDTH_PIN = 25;
var HEIGHT_PIN = 70;
var ESC_KEYCODE = 27;
var setup = document.querySelector('.map');
var setupOpen = document.querySelector('.map__pin--main');
var listElement = document.querySelector('.map__pins');
var buttonClose = document.querySelector('.popup__close');

var transformArray = function (array, deleteElement) {
  var index = Math.floor(Math.random() * array.length);
  return deleteElement ? array.splice(index, 1) : array[index];
};

var compareRandom = function () {
  return Math.random() - 0.5;
};

var getRandomValue = function (min, max) {
  return Math.round(min + Math.random() * max);
};

var getRandomFeatures = function (arr) {
  return arr.slice(0, Math.round(Math.random() * arr.length));
};

var createArrayPopup = function () {
  var adverts = [];
  var locationX = '';
  var locationY = '';
  for (var i = 0; i < 8; i++) {
    locationX = getRandomValue(300, 600);
    locationY = getRandomValue(130, 500);
    var advert = {
      location: {
        x: locationX,
        y: locationY
      },
      author: {
        avatar: 'img/avatars/user0' + transformArray(NUMBERS, true)
      },
      offer: {
        title: transformArray(TITLES, true),
        address: locationX + ', ' + locationY,
        price: getRandomValue(1000, 1000000),
        type: transformArray(TYPES_RUS),
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 10),
        checkin: transformArray(CHECKS),
        checkout: transformArray(CHECKS),
        features: getRandomFeatures(FEATURES),
        description: '',
        photos: PHOTOS.sort(compareRandom)
      }
    };
    adverts.push(advert);
  }
  return adverts;
};

var adverts = createArrayPopup();

var renderFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newFeatures = document.createElement('li');
    newFeatures.setAttribute('class', 'popup__feature popup__feature--' + features[i]);
    fragment.appendChild(newFeatures);
  }
  return fragment;
};

var renderPhoto = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var newPhoto = document.querySelector('template').content.querySelector('.popup__photo').cloneNode(true);
    newPhoto.setAttribute('src', arr[i]);
    fragment.appendChild(newPhoto);
  }
  return fragment;
};

var renderPins = function (item) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPin = pinTemplate.cloneNode(true);
  mapPin.querySelector('img').setAttribute('src', item.author.avatar + '.png');
  mapPin.setAttribute('style', 'left: ' + (item.location.x - HALF_WIDTH_PIN) + 'px; ' + 'top:' + (item.location.y - HEIGHT_PIN) + 'px;');
  mapPin.setAttribute('alt', item.offer.title);
  return mapPin;
};

var renderOffer = function (item) {
  var offerTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardOffer = offerTemplate.cloneNode(true);
  cardOffer.querySelector('.popup__title').textContent = item.offer.title;
  cardOffer.querySelector('.popup__text--address').textContent = item.offer.address;
  cardOffer.querySelector('.popup__text--price').textContent = item.offer.price + ' Р/ночь';
  cardOffer.querySelector('.popup__type').textContent = item.offer.type;
  cardOffer.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.rooms + ' гостей';
  cardOffer.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  cardOffer.querySelector('.popup__features').textContent = '';
  cardOffer.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
  cardOffer.querySelector('.popup__description').textContent = item.offer.description;
  cardOffer.querySelector('.popup__avatar').src = item.author.avatar + '.png';
  cardOffer.querySelector('.popup__photos').appendChild(renderPhoto(item.offer.photos));
  cardOffer.querySelector('.popup__photo').classList.add('hidden');
  cardOffer.classList.add('hidden');
  return cardOffer;
};

var documentFragment = function () {
  for (var i = 0; i < 8; i++) {
    var pinFragment = document.createDocumentFragment();
    pinFragment.appendChild(renderPins(adverts[i]));
    listElement.insertBefore(pinFragment, document.querySelector('.map__overlay'));
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(renderOffer(adverts[i]));
    setup.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  }
};

var addDisabledNotice = function (inactive) {
  var noticeElements = document.querySelectorAll('.notice fieldset');
  for (var i = 0; i < noticeElements.length; i++) {
    inactive ? noticeElements[i].setAttribute('disabled', 'disabled') : noticeElements[i].removeAttribute('disabled', 'disabled');
  }
};
addDisabledNotice(true);

var pressEcsPopup = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
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
    (cards[i].getAttribute("class") === "map__card popup") ? cards[i].classList.add("hidden") : cards[i].classList.remove("hidden");
    cards[i].querySelector('.popup__close').addEventListener('click', closeCard);
    document.addEventListener('keydown', pressEcsPopup);
  })
  document.addEventListener('keydown', pressEcsPopup);
};

var activateMap = function () {
  documentFragment();
  setup.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  addDisabledNotice(false);
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(openCard);
  setupOpen.removeEventListener('mouseup', activateMap);
};

setupOpen.addEventListener('mouseup', activateMap);
