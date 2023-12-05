const https = require('https')
const fs = require('fs')

function consultar(item){
    return new Promise((resolve) => {

        https.get(`https://west.albion-online-data.com/api/v2/stats/Prices/${item}.json`, (resposta) => {
        let data = ''

        resposta.on('data', (chunk) => {
            data += chunk
        })

        resposta.on('end', () => {

            dataJson = JSON.parse(data)

            resolve(dataJson)
 
        })

        }).on("error", (err) => {
        console.log("Error: " + err.message)
        })

    })
}

function searchItem(busca){
    let itens = JSON.parse(fs.readFileSync('./src/data/itemsReworked.json', 'utf-8'))

    let resultadoBusca = []

    itens.forEach(item => {
        
        let nome = item['Nome'].toLowerCase()

        if (nome.includes(busca.toLowerCase())) {
        resultadoBusca.push(item)
        }
        
    })

    return resultadoBusca

}

async function exibirConsulta(item){

    let resultado = searchItem(item)

    resultado.forEach( async item => {
        let consultas = await consultar(item['Código'])

        console.log(item['Nome'])

        consultas.forEach(consulta => {
            console.log(`${consulta['city']} ${consulta['sell_price_min']} ${consulta['sell_price_max']}`)
        })
    })

    
}

exibirConsulta('Capa aval')
