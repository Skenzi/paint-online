const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg)
    })
})

app.listen(PORT, () => console.log('server started'))