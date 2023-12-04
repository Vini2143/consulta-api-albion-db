const https = require('https')

let url = 'https://west.albion-online-data.com'

let item = 'T4_HIDE_LEVEL3@3'

let parametros  = `/api/v2/stats/Prices/${item}.json`

https.get(url + parametros, (resp) => {
  let data = '';

  // Um bloco de dados foi recebido.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // Toda a resposta foi recebida. Exibir o resultado.
  resp.on('end', () => {
    dataJson = JSON.parse(data)

    dataJson.forEach((atributo) => {
        console.log(`${atributo['city']} ${atributo['sell_price_min']} ${atributo['sell_price_max']}`)
    })

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
