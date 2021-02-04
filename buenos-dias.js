const config = require("./config.js");
const axios = require('axios').default

/*
const data = JSON.stringify({
    "phone": '525565148491',
    "body": "*Buenos dias princesa c:*"
});

var https = require('https');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
    host: 'eu145.chat-api.com',
    path: '/instance223756/sendMesssage?token='+config.token,
    //This is what changes the request to a POST request
    port: 443,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      process.stdout.write(d)
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.write(data)
  req.end()*/

async function apiChatApi(method, params){
    const url = `${config.apiUrl}/${method}?token=${config.token}`; 
    return axios.post(url, params).then(r => r.data);
}

apiChatApi('sendMessage', {
    "phone": '525565148491',
    "body": "*Buenos dias princesa c:*"
})