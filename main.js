const https = require('https')

let url = 'https://west.albion-online-data.com'

let itemList = 'T4_HIDE_LEVEL3@3'
let format = 'json'

let parametros  = `/api/v2/stats/Prices/${itemList}.${format}`

https.get(url + parametros, (resp) => {
  let data = '';

  // Um bloco de dados foi recebido.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // Toda a resposta foi recebida. Exibir o resultado.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
