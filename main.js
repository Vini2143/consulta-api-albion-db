import { get } from "https"
import { readFileSync } from "fs"

function consultar(codigoItem, cidade = false) {
    return new Promise((resolve) => {

        get(cidade ? 
            `https://west.albion-online-data.com/api/v2/stats/Prices/${codigoItem}.json?locations=${encodeURIComponent(cidade)}` :
            `https://west.albion-online-data.com/api/v2/stats/Prices/${codigoItem}.json`, (resposta) => {
            let data = ''
    
            resposta.on('data', (chunk) => {
                data += chunk
            })
    
            resposta.on('end', () => {
    
                let dataJson = JSON.parse(data)
    
                resolve(dataJson)
        
            })
    
        }).on("error", (err) => {
            console.log("Error: " + err.message)
        }) 

/*         let request = new XMLHttpRequest()

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = request.responseText

                let dataJson = JSON.parse(data)

                resolve(dataJson)
            }
        }

        request.open('GET', `https://west.albion-online-data.com/api/v2/stats/Prices/${item}.json`, true)
        request.send() */

    })
}

function searchItem(busca) {
    let itens = JSON.parse(readFileSync('./src/data/itemsReworked.json', 'utf-8'))

    let resultadoBusca = []

    itens.forEach(item => {

        let nome = item['Nome'].toLowerCase()

        if (nome.includes(busca.toLowerCase())) {
            resultadoBusca.push(item)
        }

    })

    return resultadoBusca

}

async function exibirConsulta(item, cidade) {

    let resultado = searchItem(item)
    let qualidades = ['Normal', 'Bom', 'Excepcional', 'Excelente', 'Obra-prima']

    let data =  new Date().setMinutes(new Date().getMinutes() - 10)

    resultado.forEach(async item => {
        let consultas = await consultar(item['Código'], cidade)

        consultas.forEach(consulta => {

            if (//consulta['sell_price_min'] != 0 && 
                //consulta['sell_price_max'] != 0 &&
                //new Date(consulta['sell_price_min_date']) > data &&
                //new Date(consulta['sell_price_max_date']) > data &&
                //consulta['buy_price_min'] != data &&
                //consulta['buy_price_max'] != data &&
                new Date(consulta['buy_price_min_date']) > data &&
                new Date(consulta['buy_price_max_date']) > data
                ) {
                console.log(`${item['Nome']} ${qualidades[consulta['quality'] - 1]} - ${consulta['city']} - ${consulta['buy_price_max']}`)
                //console.log(consulta)
            }
        })
    })
}

exibirConsulta('Capa aval', 'Black Market')
