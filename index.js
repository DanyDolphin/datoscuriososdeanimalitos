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

app.listen(process.env.PORT || 4000, args => console.log('listening on port ' + (process.env.PORT || 4000)))