const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json())

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
            case 'drawImage':
                broadcastHandler(ws, msg);
                break;    
        }
    })
})

const broadcastHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

app.post('/image', (req, res) => {
    const image = req.body.dataUrl.replace('data:image/png;base64,', '');
    fs.writeFileSync(path.resolve(__dirname, `./rooms/${req.body.sessionId}.png`), image, 'base64', (err) => console.log(err));
})

app.get('/imageConnection', (req, res) => {
    const imageUrl = fs.readFileSync(path.resolve(__dirname, `./rooms/${req.query.sessionId}.png`));
    const data = 'data:image/png;base64,' + imageUrl.toString('base64');
    res.json(data)
})

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if(client.id === ws.id) {
            client.send(JSON.stringify(msg))
        }
    })
}

app.listen(PORT, () => console.log('server started'))