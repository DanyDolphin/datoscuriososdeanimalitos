const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const axios = require('axios').default;

const config = require("./config.js");

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())

process.on('unhandledRejection', err => {
    console.log(err)
});

async function apiChatApi(method, params){
    const url = `${config.apiUrl}/${method}?token=${config.token}`; 
    return axios.post(url, params).then(r => r.data);
}

const curiosos = [
    '*El calamar gigante tiene los ojos más grandes que cualquier ser vivo en el planeta, tiene un diámetro de más de 40 cm*',
    '*¿Sabes que la pulga puede saltar una distancia equivalente a 30 veces la longitud de su cuerpo? Tres veces la longitud de un ser humano es la longitud de un terreno de fútbol!*',
    '*Los delfines aunque no tanto, también saltan mucho. Éstos pueden dar saltos hasta 90 metros de alto y 10 de largo por encima del agua, increíble, ¿verdad?*',
    '*¿Pensabas que las personas y los gatos son muy diferentes? te vamos a dar un dato que te acercará más a ellos. Las zonas del cerebro relacionadas con las emociones son iguales en nosotros que en los gatos.*',
    '*Los elefantes es el único animal que no pueden saltar*',
    '*Los cocodrilos no pueden sacar la lengua.*',
    '*Los camellos cuentan con tres párpados para protegerse de las tormentas de arena.*',
    '*Los gallos como tú sabes, marca su territorio, esto lo hacen en la mañana con su canto por que es cuando las aves están más activas.*',
    '*El ojo de un avestruz es más grande que su cerebro.*',
    '*El calamar gigante tiene los ojos más grandes que cualquier ser vivo en el planeta, tiene un diámetro de más de 40 cm*',
    '*El tamaño de cerebro de un cocodrilo es igual al del dedo pulgar de una persona.*',
    '*La lengua de una ballena azul pesa como un elegante adulto.*',
    '*Las mariposas tiene el sentido del gusto en sus patas.*',
    '*El pelícano o pájaro Martín, ven a sus presas debajo del agua porque sus ojos filtran los reflejos de la superficie del agua y así pueden ver lo que hay debajo.*',
    '*Cuando una hormiga muere dentro de una casa, su cuerpo despide un olor que atrae a otras hormigas que son quienes se encargan de enterrarla.*',
    '*Un hipopótamo corre más rápido que un hombre.*',
    '*El Koala Australiano nunca toma agua, se alimenta únicamente de las hojas del eucalipto, de ellas obtiene la humedad que necesita.*',
    '*El corazón del colibrí al igual que el del canario, late mil veces por minuto.*',
    '*El mosquito tiene 47 dientes, el tiburón ballena tiene más de 4,500 y el pez gato tiene 9,280.*',
    '*La jirafa duerme tan sólo 7 minutos por día y lo hace de pie.*',
    '*Una vaca emite a la atmósfera 182,500 litros de metano al año (una de las causas del agujero de la Capa de Ozono).*',
]

function getRandomHint() {
    const max = curiosos.length
    const min = 0
    const ran = Math.floor(Math.random() * (max - min) + min)
    return curiosos[ran]
}

app.get('/', async function(req, res) {
    res.send(getRandomHint())
})

app.post('/webhook', async function (req, res) {
    const data = req.body;
    for (var i in data.messages) {
        const author = data.messages[i].author;
        const body = data.messages[i].body;
        const chatId = data.messages[i].chatId;
        const senderName = data.messages[i].senderName;
        console.log(senderName, author, chatId, body);
        
        if(data.messages[i].fromMe) {
            res.send('ok')
            return;
        }

        if(/dato curioso/.test(body.toLowerCase())) {
            console.log('jeje')
            // mandar un dato curioso sobre un animal
            await apiChatApi('sendMessage', {
                "chatId": chatId,
                "body": getRandomHint()
            })
            console.log('mensaje enviado!')
        }
    }
    res.send('ok')
});

app.listen(process.env.PORT || 4000, args => console.log('listening on port ' + (process.env.PORT || 4000)))