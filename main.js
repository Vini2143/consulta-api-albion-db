const https = require('https')

function consultar(item){
    return new Promise((resolve) => {

        https.get(`https://west.albion-online-data.com/api/v2/stats/Prices/${item}.json`, (resposta) => {
        let data = ''

        // Um bloco de dados foi recebido.
        resposta.on('data', (chunk) => {
            data += chunk
        })

        // Toda a resposta foi recebida. Exibir o resultado.
        resposta.on('end', () => {

            dataJson = JSON.parse(data)

            resolve(dataJson)

        //    dataJson.forEach((consulta) => {
        //        console.log(`${consulta['city']} ${consulta['sell_price_min']} ${consulta['sell_price_max']}`)
        //    })    
        })

        }).on("error", (err) => {
        console.log("Error: " + err.message)
        })


    })
}

async function exibirConsulta(item){
    let consultas = await consultar(item)
    consultas.forEach(consulta => {
        console.log(`${consulta['city']} ${consulta['sell_price_min']} ${consulta['sell_price_max']}`)
    })
}

exibirConsulta('T4_HIDE_LEVEL3@3')
