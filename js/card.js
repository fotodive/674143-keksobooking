'use strict';

(function () {

  var translateType = function (type) {
    switch (type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
    }
    return type;
  };
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

  var renderOffer = function (item) {
    var offerTemplate = document.querySelector('#card').content.querySelector('.popup');
    var cardOffer = offerTemplate.cloneNode(true);
    cardOffer.querySelector('.popup__title').textContent = item.offer.title;
    cardOffer.querySelector('.popup__text--address').textContent = item.offer.address;
    cardOffer.querySelector('.popup__text--price').textContent = item.offer.price + ' Р/ночь';
    cardOffer.querySelector('.popup__type').textContent = translateType(item.offer.type);
    cardOffer.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.rooms + ' гостей';
    cardOffer.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    cardOffer.querySelector('.popup__features').textContent = '';
    cardOffer.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
    cardOffer.querySelector('.popup__description').textContent = item.offer.description;
    cardOffer.querySelector('.popup__avatar').src = item.author.avatar;
    cardOffer.querySelector('.popup__photos').appendChild(renderPhoto(item.offer.photos));
    cardOffer.querySelector('.popup__photo').classList.add('hidden');
    cardOffer.classList.add('hidden');
    return cardOffer;
  };

  window.card = {
    renderOffer: renderOffer
  };

}) ();
