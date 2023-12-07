import { get } from "https"
import { readFileSync } from "fs"

function consultar(codigoItem, cidade) {
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

function exibirConsulta(item, cidade = false, intervalo = 60) {

    let resultado = searchItem(item)
    let qualidades = ['Normal', 'Bom', 'Excepcional', 'Excelente', 'Obra-prima']

    let data = new Date()
    data.setMinutes(data.getMinutes() - intervalo)
 
    resultado.forEach(async item => {
        let consultas = await consultar(item['Código'], cidade)

        consultas.forEach(consulta => {

            if (//new Date(consulta['sell_price_min_date']) > data &&
                //new Date(consulta['sell_price_max_date']) > data &&
                new Date(consulta['buy_price_min_date']+'.000+00:00') >= data &&
                new Date(consulta['buy_price_max_date']+'.000+00:00') >= data
                ) {
                console.log(`${item['Nome']} ${qualidades[consulta['quality'] - 1]} - ${consulta['city']} - ${consulta['buy_price_max']}`)

            }
        })
    })
}

exibirConsulta('Capa aval', 'Black Market', 60)
