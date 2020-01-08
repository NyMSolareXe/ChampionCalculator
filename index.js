const express = require('express');
const app = express();


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening for connections'));


app.use(express.static(__dirname));


const url = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/champion.json';
let championNameArrayOnly = [];
(async function fetchData() {
    const response = await fetch(url);
    const jsonObject = await response.json();
    championNameArrayOnly = Object.keys(jsonObject.data);
})();

let championList = {};
(async function fetchData() {
    const response = await fetch(url);
    const jsonObject = await response.json();
    championList = jsonObject.data;

})();




app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})