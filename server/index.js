const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch(msg.event) {
            case 'connection': 
                broadcastHandler(ws, msg);
                break;
            case 'draw':
                broadcastHandler(ws, msg);
                break;
        }
    })
})

const broadcastHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if(client.id === msg.id) {
            console.log(msg)
            client.send(JSON.stringify(msg))
        }
    })
}

app.listen(PORT, () => console.log('server started'))