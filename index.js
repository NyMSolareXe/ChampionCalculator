const express = require('express');
const app = express();


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening for connections'));


app.use(express.static(__dirname));


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})