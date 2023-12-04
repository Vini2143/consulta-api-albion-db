const fs = require('fs')


try {
    let json = JSON.parse(fs.readFileSync('items.json', 'utf-8'))

    let items = []

    json.forEach(registro => {

        let item = {
        Nome : registro['LocalizedNames']['PT-BR'],
        Codigo : registro['UniqueName']
        }
        
        items.push(item)
        
    })

    let itemsJson = JSON.stringify(items, null, 2);

    fs.writeFileSync('itemsRecriado.json', itemsJson, 'utf8')
} catch (erro) {
    console.log(log)
}
