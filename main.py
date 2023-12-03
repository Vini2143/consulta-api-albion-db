import requests
import json

url = 'https://west.albion-online-data.com'

itemList = 'T4_HIDE_LEVEL3@3'
format = 'json'

parametros  = f'/api/v2/stats/Prices/{itemList}.{format}'

resposta = requests.get(url+parametros)

dados = resposta.json()

print(json.dumps(dados, indent=2))
