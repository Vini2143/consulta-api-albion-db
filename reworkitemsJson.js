const fs = require('fs')

let json = JSON.parse(fs.readFileSync('items.json', 'utf-8'))

let items = []

json.forEach(registro => {

    try {
        let item = {
            Nome: registro['LocalizedNames']['PT-BR'],
            Codigo: registro['UniqueName']
        };

        items.push(item)
    } catch {
        return
    }
    
})

let itemsJson = JSON.stringify(items, null, 2);

fs.writeFileSync('itemsRecriado.json', itemsJson, 'utf8')

