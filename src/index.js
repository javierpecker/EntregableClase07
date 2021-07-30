import express from 'express';
import fs from 'fs';

const puerto = 8080;

const app = express();

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});

fs.readFile('./productos.txt', (errRead, dataFile) => {
  if (errRead) console.log('Error Lectura', errRead);
  const datas = dataFile.toString();

const data = eval('(' + datas + ')')


  function ran(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
  }

  let itemsvisitors = 0;
  app.get('/items', (request, response) => {
    itemsvisitors +=1 ;
    let indice = 0;
    const aux = [];
    data.forEach(lala => {
      aux.push(data[indice].title)
      indice += 1;
  });
    response.json({
      items: aux,
      cantidad: aux.length
    });
  });

  let ranvisitors = 0;
  app.get('/items-random', (request, response) => {
    ranvisitors +=1 ;
    response.json({
      items: data[ran(0,data.length)],
    });
  });

  app.get('/visitas', (request, response) => {
    response.json({
      visitas: {
        items: itemsvisitors,
        item_random: ranvisitors,
      } 
    });
  });

});
