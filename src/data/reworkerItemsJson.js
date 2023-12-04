const fs = require('fs')

let json = JSON.parse(fs.readFileSync('./src/data/items.json', 'utf-8'))

let itens = []

json.forEach(registro => {

    try {
        let item = {
            Nome: registro['LocalizedNames']['PT-BR'],
            Código: registro['UniqueName']
        }

        itens.push(item)
    } catch {
        return
    }
    
})

let itensJson = JSON.stringify(itens, null, 2)

fs.writeFileSync('./src/data/itemsReworked.json', itensJson, 'utf8')

