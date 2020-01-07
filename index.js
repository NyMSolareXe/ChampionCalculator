const express = require('express');
const app = express();


app.listen(3000, () => console.log('Listening for connections'));


app.use(express.static(__dirname));


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})