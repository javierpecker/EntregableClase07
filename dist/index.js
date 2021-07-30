"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var puerto = 8080;
var app = (0, _express["default"])();
var server = app.listen(puerto, function () {
  return console.log('Server Up en puerto', puerto);
});
server.on('error', function (err) {
  console.log('ERROR =>', err);
});

_fs["default"].readFile('./productos.txt', function (errRead, dataFile) {
  if (errRead) console.log('Error Lectura', errRead);
  var datas = dataFile.toString();
  var data = eval('(' + datas + ')');

  function ran(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  var itemsvisitors = 0;
  app.get('/items', function (request, response) {
    itemsvisitors += 1;
    var indice = 0;
    var aux = [];
    data.forEach(function (lala) {
      aux.push(data[indice].title);
      indice += 1;
    });
    response.json({
      items: aux,
      cantidad: aux.length
    });
  });
  var ranvisitors = 0;
  app.get('/items-random', function (request, response) {
    ranvisitors += 1;
    response.json({
      items: data[ran(0, data.length)]
    });
  });
  app.get('/visitas', function (request, response) {
    response.json({
      visitas: {
        items: itemsvisitors,
        item_random: ranvisitors
      }
    });
  });
});