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

app.get('/', async function(req, res) {
    await axios.post('http://localhost:4000/webhook', {
        "instanceId": "223756",
        "messages": [
          {
            "id": "false_17472822486@c.us_DF38E6A25B42CC8CCE57EC40F",
            "body": "dame un dato curioso por favor!",
            "type": "chat",
            "senderName": "Ilya",
            "fromMe": true,
            "author": "17472822486@c.us",
            "time": 1504208593,
            "chatId": "17472822486@c.us",
            "messageNumber": 100
          }
        ]
      })
      res.send('huevos')
})

async function apiChatApi(method, params){
    const url = `${config.apiUrl}/${method}?token=${config.token}`; 
    return axios.post(url, params).then(r => r.data);
}

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

        if(/dato curioso/.test(body)) {
            console.log('jeje')
            // mandar un dato curioso sobre un animal
            await apiChatApi('sendMessage', {
                "chatId": chatId,
                "body": "*Los cocodrilos comen piedras para bucear mejor*"
            })
            console.log('mensaje enviado!')
        }
    }
    res.send('ok')
});

app.listen(4000, args => console.log('listening on port 4000'))