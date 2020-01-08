const express = require('express');
const app = express();
const fetch = require('node-fetch');


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening for connections'));


app.use(express.static(__dirname));
app.use(express.json({ limit: '10mb' }));

let championNameArrayOnly = [];
const url = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/champion.json';

app.get('/api', async (req, res) => {
    const response = await fetch(url);
    const jsonObject = await response.json();
    res.send(jsonObject.data);
})