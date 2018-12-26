'use strict';

(function () {
  var TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var userAddress = document.querySelector('#address');
  var typeSelect = document.querySelector('#type');
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var addDisabledNotice = function (inactive) {
    var noticeElements = document.querySelectorAll('.notice fieldset');
    for (var i = 0; i < noticeElements.length; i++) {
      if (inactive) {
        noticeElements[i].setAttribute('disabled', 'disabled');
      } else {
        noticeElements[i].removeAttribute('disabled', 'disabled');
      }
    }
  };

  addDisabledNotice(true);

  var setAttributes = function (elem, attrs) {
    for (var key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        elem.setAttribute(key, attrs[key]);
      }
    }
  };

  var activateForm = function () {
    setAttributes(titleInput, {'required': 'required', 'minlength': 30, 'maxlength': 100});
    setAttributes(priceInput, {'required': 'required', 'max': 1000000});
    userAddress.setAttribute('readonly', 'readonly');
    typeSelect.setAttribute('required', 'required');
    roomsSelect.setAttribute('required', 'required');
    capacitySelect.setAttribute('required', 'required');
  };

  typeSelect.addEventListener('change', function (evt) {
    for (var i = 0; i < TYPES.length; i++) {
      if (evt.target.value === TYPES[i]) {
        setAttributes(priceInput, {'min': MIN_PRICES[i], 'placeholder': MIN_PRICES[i]});
      }
    }
  });

  timeinSelect.addEventListener('change', function () {
    timeoutSelect.value = timeinSelect.value;
  });
  timeoutSelect.addEventListener('change', function () {
    timeinSelect.value = timeoutSelect.value;
  });

  var sendMessage = function (valid, message) {
    if (valid) {
      capacitySelect.setCustomValidity('');
    } else {
      capacitySelect.setCustomValidity(message);
    }
  };

  var settingCapacity = function () {
    var isValid = capacitySelect.validity.valid;
    if (roomsSelect.value === '1') {
      isValid = capacitySelect.value === '1';
      sendMessage(isValid, 'Для одной комнаты один гость');
    }
    if (roomsSelect.value === '2') {
      isValid = capacitySelect.value === '1' || capacitySelect.value === '2';
      sendMessage(isValid, 'Для двух комнат один или два гостя');
    }
    if (roomsSelect.value === '3') {
      isValid = capacitySelect.value === '1' || capacitySelect.value === '2' || capacitySelect.value === '3';
      sendMessage(isValid, 'Для трех комнат один, два или гостя');
    }
    if (roomsSelect.value === '100') {
      isValid = capacitySelect.value === '0';
      sendMessage(isValid, 'Сто комнат не для гостей');
    }
    return false;
  };

  roomsSelect.addEventListener('change', settingCapacity);
  capacitySelect.addEventListener('change', settingCapacity);

  var onLoad = function () {
    window.error.showSuccessMessage();
  };

  document.querySelector('.ad-form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveForm(new FormData(document.querySelector('.ad-form')), onLoad, window.error.showErrorMessage);
  });

  window.form = {
    addDisabledNotice : addDisabledNotice,
    activateForm : activateForm
  };

}) ();
