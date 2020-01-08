const express = require('express');
const app = express();
const fetch = require('node-fetch');


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening for connections'));


app.use(express.static(__dirname));
app.use(express.json({ limit: '10mb' }));


const naLatestPatchURL = 'https://ddragon.leagueoflegends.com/realms/na.json';
let championNameArrayOnly = [];
let url;
let version;


// Server Side Only
(async function initializeData() {
    const response9 = await fetch(naLatestPatchURL);
    const jsonObject9 = await response9.json();
    version = jsonObject9.dd;
    url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
    // const response = await fetch(url);
    // const jsonObject = await response.json();
    // res.send(jsonObject.data);    
})();


// Get the DATA
app.get('/api', async (req, res) => {
    const response = await fetch(url);
    const jsonObject = await response.json();
    // console.log(jsonObject.data)
    res.send(jsonObject.data);
});

// Get the SKIN
app.get('/api/:champName', async (req, res) => {
    const myChamp = req.params.champName;
    const response1 = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${myChamp}.json`);
    const jsonObject = await response1.json();
    res.send(jsonObject.data);
});