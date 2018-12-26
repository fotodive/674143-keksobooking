'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var main = document.querySelector('main');

  var showSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successBlock = successTemplate.cloneNode(true);
    main.appendChild(successBlock);

    var closeSuccessPopup = function () {
      if (successBlock) {
        main.removeChild(successBlock);
      }
      document.querySelector('.ad-form').reset();
      document.removeEventListener('click', clickErrorPopup);
      document.removeEventListener('keydown', pressEcsErrorPopup);
    };

    var clickErrorPopup = function () {
      closeSuccessPopup();
    };

    var pressEcsErrorPopup = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSuccessPopup();
      }
    };

    document.addEventListener('click', clickErrorPopup);
    document.addEventListener('keydown', pressEcsErrorPopup);
  };

  var showErrorMessage = function (error) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    main.appendChild(errorBlock);
    var errorMessage = errorBlock.querySelector('.error__message');
    errorMessage.innerText = error;

    var closeErrorPopup = function () {
      if (errorBlock) {
        main.removeChild(errorBlock);
      }
      window.map.activateMap();
      document.removeEventListener('click', clickErrorPopup);
      document.removeEventListener('keydown', pressEcsErrorPopup);
    };

    var clickErrorPopup = function () {
      closeErrorPopup();
    };

    var pressEcsErrorPopup = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeErrorPopup();
      }
    };

    document.addEventListener('click', clickErrorPopup);
    document.addEventListener('keydown', pressEcsErrorPopup);
  };

  window.error = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
    ESC_KEYCODE: ESC_KEYCODE
  };

})();
