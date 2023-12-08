# Ecg Monitor
O Ecg Monitor é uma aplicação front-end desenvolvida com ReactJS, para visualizar exames ECG (Eletrocardiograma) que busca os dados dos exames do projeto FASS-ECG https://github.com/if4health/FASS-ECG no padrão FHIR https://www.hl7.org/fhir/. A aplicação é capaz de exibir os exames tanto na forma dinamica, quanto na forma estatica.

### Exemplo estático
![ECG_Estatico](images/ECG_Estatico.png)

## Requisitos
NodeJS [https://nodejs.org/en/](URL) 

## Instalação
Primeiramente, antes da instalação é necessário clonar o projeto, para isso no computador no terminal que você utiliza utilizar o comando:

`git clone https://github.com/if4health/ecgmonitor`

Após o clone entre no projeto e novamente abra o terminal e execute o comando abaixo (pode levar alguns minutos):

`npm install`

Após instalar o projeto basta executar o comando abaixo:

`npm start`

Pronto o projeto ja vai carregar na url http://localhost:8080


## Observações

O projeto ja esta pronto para subir para um ambiente do Netlify, atualmente esta na URL https://ecg-monitor-if4health.netlify.app/

Tabém é importante destacar que atualmente como o projeto do FASS-ECG esta em ambiente apenas http, os navegadores bloqueiam a chamada do API e com isso nÃo é possível visualizar, 


