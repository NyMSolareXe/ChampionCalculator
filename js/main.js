let url;
let version;
const naLatestPatchURL = 'https://ddragon.leagueoflegends.com/realms/na.json';
const search = document.getElementById("search");
const matchList = document.getElementById("match-List");
const jagger = document.getElementById('jagger');
const myTable = document.getElementById('mainTable');

let myLevel = 1;
(function createTable() {
  for (k = 1; k < 19; k++) {
    let rdx = document.createElement('tr');
    let htmlText = `<th class=>${myLevel}</th>`;
    for (i = 1; i < 9; i++) {
      htmlText += `<td>NyM</td>`
    }
    myLevel++;
    myTable.children[1].appendChild(rdx);
    rdx.innerHTML = htmlText
  }
})();

function calculateValues() {

  for (i = 0; i < 18; i++) {
    // Health
    let answer = parseFloat(baseHealth.value) + parseFloat(baseHealthPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[1].innerHTML = answer.toFixed(0);

    // HP Regen
    answer = parseFloat(hpRegen.value) + parseFloat(hpRegenPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[2].innerHTML = answer.toFixed(1);

    // Mana
    answer = parseFloat(baseMana.value) + parseFloat(baseManaPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[3].innerHTML = answer.toFixed(0);

    // Mana Regen
    answer = parseFloat(manaRegen.value) + parseFloat(manaRegenPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[4].innerHTML = answer.toFixed(1);

    // Damage
    answer = parseFloat(damage.value) + parseFloat(damagePlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[5].innerHTML = answer.toFixed(1);

    // Attack Speed
    let b = attackSpeedBonus.value;
    if (!b) {
      b = 0;
    }

    answer = parseFloat(attackSpeed.value) + parseFloat(attackSpeed.value) / 100 * parseFloat(attackSpeedPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72)) + parseFloat(attackSpeed.value) / 100 * b
    myTable.children[1].children[i].children[6].innerHTML = answer.toFixed(3);

    // Armor
    answer = parseFloat(armor.value) + parseFloat(armorPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[7].innerHTML = answer.toFixed(1);

    // Magic Resistance
    answer = parseFloat(mr.value) + parseFloat(mrPlus.value) * ((((parseFloat(myTable.children[1].children[i].children[0].textContent) - 2) * (parseFloat(myTable.children[1].children[i].children[0].textContent) - 1)) / 2) * 0.035 + ((parseFloat(myTable.children[1].children[i].children[0].textContent) - 1) * 0.72))
    myTable.children[1].children[i].children[8].innerHTML = answer.toFixed(1);
  }

}

let answer = baseHealth.value + baseHealthPlus.value * (((myTable.children[1].children[0].children[0].textContent - 2) * (myTable.children[1].children[0].children[0].textContent - 1)) / 2) * 0.035 + ((myTable.children[1].children[0].children[0].textContent - 1) * 0.72)
// const url = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/champion.json';
let championNameArrayOnly = [];
let championList = {};


// (async function fetchData() {
//   const response = await fetch('/api');
//   const jsonObject = await response.json();
//   championList = jsonObject;
//   championNameArrayOnly = Object.keys(championList);
// })();

// let championNameArrayOnly = [];
// const url = 'http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/champion.json';

async function joseph() {
  const response9 = await fetch(naLatestPatchURL);
  const jsonObject9 = await response9.json();
  version = jsonObject9.dd;

  url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

    const response = await fetch(url);
    const jsonObject = await response.json();
    championList = jsonObject.data;
    championNameArrayOnly = Object.keys(championList);

};
joseph();

async function josephina(myChampName) {
  const myChamp = myChampName;
  const response1 = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${myChamp}.json`);
  const jsonObject = await response1.json();

  let champSkinArray = jsonObject.data[myChamp].skins;
  let champSkinArrayReal = [];

  champSkinArray.forEach(uniqueSkin => {
    champSkinArrayReal.push(uniqueSkin.num);
    // console.log(uniqueSkin.num);
  })

  let randomSkin = parseInt(Math.random() * jsonObject.data[myChamp].skins.length);
  randomSkin = champSkinArrayReal[randomSkin];

  mySplash.style.backgroundImage = `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${myChamp}_${randomSkin}.jpg)`;

}







// calculateValues();
arrayToActivate = [baseHealth, baseHealthPlus, baseMana, baseManaPlus, hpRegen, hpRegenPlus, manaRegen, manaRegenPlus, armor, armorPlus, mr, mrPlus, damage, damagePlus, attackSpeed, attackSpeedBonus, attackSpeedBonus];

arrayToActivate.forEach(input => {
  input.addEventListener('keyup', () => {
    calculateValues();
  });
});




const searchChampions = async searchText => {

  let matches = [];
  try {
    matches = championNameArrayOnly.filter(championName => {
      const regex = new RegExp(`^${searchText}`, "i");
      return championName.match(regex);
    });
  } catch (ex) {
    // alert('Dont Use Backslashes');
  }


  if (search.value.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);

  const found = championNameArrayOnly.find(championName => {
    const regex = new RegExp(`^${championName}`, "i");
    if (search.value.match(regex)) {
      search.value = championName;
      return true;
    }
  });

  if (found) {
    changeNumber(championList[found]);
    matchList.innerHTML = "";
    attackSpeedBonus.value = '';

    let badChampionArray = {
      Lux: { baseAs: 0.625, bonusAs: 7 },
      Gragas: { baseAs: 0.625, bonusAs: 8 },
      Ekko: { baseAs: 0.625, bonusAs: 10 },
      Nautilus: { baseAs: 0.612, bonusAs: 15 },
      Shen: { baseAs: 0.651, bonusAs: 15 },
      Amumu: { baseAs: 0.638, bonusAs: 15 },
      Maokai: { baseAs: 0.695, bonusAs: 15 },
      Malphite: { baseAs: 0.638, bonusAs: 15 },
      Mundo: { baseAs: 0.625, bonusAs: 15 },
      Zac: { baseAs: 0.638, bonusAs: 15 },
      Graves: { baseAs: 0.490, bonusAs: 0 }
    }

    let messager = document.getElementById('messager');

    var elements = document.querySelectorAll('#removeMe')
    if(elements.length > 0) {
      elements[0].remove();
    }

    let temp = document.createElement('div');
    temp.id = 'removeMe';
    messager.appendChild(temp);

    


    if (badChampionArray.hasOwnProperty(found)) {
      attackSpeed.value = badChampionArray[found].baseAs;
      attackSpeedBonus.value = badChampionArray[found].bonusAs;
      temp.className = 'alert alert-danger text-center'
      temp.innerHTML = 'This champion may have attack speed issues';
    }

    setTimeout(() => {
      temp.remove();
    }, 3000);

    josephina(found);
    calculateValues();

  }

};






const buttonClicked = e => {
  if (e.target.id === '') {
    search.value = e.target.parentElement.id
    searchChampions()
  } else {
    search.value = e.target.id
    searchChampions()
  }
};



// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        <div class=" mb-1 btn btn-primary" id="${match}"><h6>${match}</h6>
        </div>
        `
      )
      .join("");
    matchList.innerHTML = html;

    matches.map(match => {
      document.getElementById(match).addEventListener("click", g => buttonClicked(g));
    });
  }
};

function changeNumber(champObject) {
  baseHealth.value = champObject.stats.hp;
  baseHealthPlus.value = champObject.stats.hpperlevel;
  baseMana.value = champObject.stats.mp;
  baseManaPlus.value = champObject.stats.mpperlevel;
  hpRegen.value = champObject.stats.hpregen;
  hpRegenPlus.value = champObject.stats.hpregenperlevel;
  manaRegen.value = champObject.stats.mpregen;
  manaRegenPlus.value = champObject.stats.mpregenperlevel;
  damage.value = champObject.stats.attackdamage;
  damagePlus.value = champObject.stats.attackdamageperlevel;
  attackSpeed.value = champObject.stats.attackspeed;
  attackSpeedPlus.value = champObject.stats.attackspeedperlevel;
  armor.value = champObject.stats.armor;
  armorPlus.value = champObject.stats.armorperlevel;
  mr.value = champObject.stats.spellblock;
  mrPlus.value = champObject.stats.spellblockperlevel;
}

search.addEventListener("input", () => searchChampions(search.value));






