'use strict';
(function () {
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var REQUEST_TIMEOUT = 10000;
  var STATUS_CODE = {
    ok: 200,
    badRequest: 400,
    notFound: 404
  };

  var executeRequest = function (metod, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_CODE.ok:
          onSuccess(xhr.response);
          break;
        case STATUS_CODE.badRequest:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.notFound:
          error = 'Не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.open(metod, url);
    xhr.send(data);
  };

  var saveForm = function (onSuccess, onError, data) {
    executeRequest('POST', URL_SAVE, onSuccess, onError, data);
  };

  var loadData = function (onSuccess, onError) {
    executeRequest('GET', URL_LOAD, onSuccess, onError);
  };

  window.backend = {
    saveForm: saveForm,
    loadData: loadData
  };

})();
