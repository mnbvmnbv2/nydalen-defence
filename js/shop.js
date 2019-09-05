arrowTowerButtonEl.addEventListener("click", buyArrowTower); //event på button
var towerNumber = 0; //for at hvert tårn skal ha unik id

var arrowTowerPris = 100;
var arrowTowerPrisIncrease = 1.1;
var removeCost = 500;

var bodyEl = document.querySelector("body");
bodyEl.addEventListener("keydown", keyBuy);

function keyBuy(e){ //for å bruke keys
    console.log(e.keyCode);
    if(e.keyCode === 65){ //knapp a kjøper arrowTower
        buyArrowTower();
    }
    if(e.keyCode === 68){ //knapp d upgrader dmg
        towerDamageUpgrade();
    }
    if(e.keyCode === 83){ //knapp s upgrader speed
        towerSpeedUpgrade();
    }
    if(e.keyCode === 82){ //knapp r upgrader speed
        towerRangeUpgrade();
    }
    if(e.keyCode === 85){ //knapp r upgrader speed
        towerMultUpgrade();
    }
    if(e.keyCode === 37){ //venstre velger rute til venstre
        var getChecked = gridTiles[activeTile-1];
        activeTileMove(getChecked);
    } else if(e.keyCode === 38){ //opp
        var getChecked = gridTiles[activeTile-Number(gameWidth)];
        activeTileMove(getChecked);
    } else if(e.keyCode === 39){ //høyre
        var getChecked = gridTiles[activeTile+1];
        activeTileMove(getChecked);
    } else if(e.keyCode === 40){ //ned
        var getChecked = gridTiles[activeTile+Number(gameWidth)];
        activeTileMove(getChecked);
    }
}

function buyArrowTower(){
    if(activeTile != false && occupiedSpace.includes(activeTile) === false && map[activeTile] === 1 && gold >= arrowTowerPris){ 
        //så lenge det er en active tile, den ikke er opptatt, det er Type1, og man har råd
        gold -= arrowTowerPris;
        var arrowTower = new TowerClass( //lager ny arrowTower
            1, //towerLevel
            1, //level
            towerRanks[currentTowerRank] + " arrow tower", //name med rank
            10, //health
            10, //maxHealth
            1, //damage
            0, //xp
            10, //maxXp
            "arrow", //type
            300, //speed
            1, //range
            110, //h (hsl)
            75+"%", //color (hsL)
            mapKoor(activeTile).x, //x
            mapKoor(activeTile).y, //y
            Number(activeTile), //mapTile
            towerNumber, //unik id (towerid)
            1, //levelIncreaser
            0, //towerKills
            0, //damageDealt
            [], //tom array
            100, //levelUpDmg (price)
            100, //levelUpSpd (price)
            10000, //levelUpRng (price)
            0 //cooldown
        );
        towers.push(arrowTower); //legges til i tower array
        occupiedSpace.push(Number(activeTile)); //legges til i occupied space så ikke flere towers kan stackes i en tile

        towerNumber++;
        arrowTower.gridCreate();
        arrowTowerPris = Math.round(arrowTowerPris*arrowTowerPrisIncrease); //øker pris pr tower
        arrowTowerButtonText(); //oppdaterer pris på button
    }
    towerStat();
}

//oppdaterer pris på tårn på button
function arrowTowerButtonText(){
    arrowTowerButtonEl.innerHTML = "Buy arrow tower (" + arrowTowerPris + "g) [A]";
}

var towerDamageUpgradeButtonEl = document.getElementById("towerDamageUpgradeButton")
towerDamageUpgradeButtonEl.addEventListener("click", towerDamageUpgrade);

function towerDamageUpgrade(){ //upgrader dmg
    if(occupiedSpace.includes(activeTile) === true && map[activeTile] === 1){ //hvis det er tårn og ikke sti
        for(var i = 0; i < towers.length; i++){ //finner tårn
            if(towers[i].mapTile === activeTile && gold >= towers[i].levelUpDmg){ //tårnet er på activeTile og nok gold
                towers[i].levelUpDamage(); //levler opp dmg
            }
        }
    }
}

var towerSpeedUpgradeButtonEl = document.getElementById("towerSpeedUpgradeButton")
towerSpeedUpgradeButtonEl.addEventListener("click", towerSpeedUpgrade);

function towerSpeedUpgrade(){ //upgrader speed
    if(occupiedSpace.includes(activeTile) === true && map[activeTile] === 1){
        for(var i = 0; i < towers.length; i++){
            if(towers[i].mapTile === activeTile && gold >= towers[i].levelUpSpd){
                towers[i].levelUpSpeed();
            }
        }
    }
}

var towerSpeedUpgradeButtonEl = document.getElementById("towerSpeedUpgradeButton")
towerSpeedUpgradeButtonEl.addEventListener("click", towerSpeedUpgrade);

function towerRangeUpgrade(){ //upgrader speed
    if(occupiedSpace.includes(activeTile) === true && map[activeTile] === 1){
        for(var i = 0; i < towers.length; i++){
            if(towers[i].mapTile === activeTile && gold >= towers[i].levelUpRng){
                towers[i].levelUpRange();
                towers[i].gridCreate();
                towerStat();
            }
        }
    }
}

//interest upgrades
var currentInterest = 0; //index for levelet man er på

var interests = [ //interest nivåer + pris
    {interest : 1.001, interestTime : 10, price : 0},
    {interest : 1.001, interestTime : 8, price : 100},
    {interest : 1.002, interestTime : 6, price : 1000},
    {interest : 1.004, interestTime : 5, price : 25000},
    {interest : 1.005, interestTime : 4, price : 100000},
    {interest : 1.008, interestTime : 4, price : 500000},
    {interest : "no more", interestTime : 4, price : "max"}
]

var interestButtonEl = document.getElementById("interestButton");
interestButtonEl.addEventListener("click", interestUpgrade);

//viser prisen på knapp
interestButtonEl.innerHTML = "Better interest (" + interests[currentInterest+1].price + ")";

function interestUpgrade(){
    if(currentInterest < (interests.length - 2)){
        if(gold >= interests[currentInterest+1].price){
            gold -= interests[currentInterest+1].price; //fjerner gull
            currentInterest++; //øker den nåverende banksituasjonen
            interest = interests[currentInterest].interest;
            interestTime = interests[currentInterest].interestTime;

            if(currentInterest >= (interests.length - 2)){ //når man har siste upgrade
                interestButtonEl.innerHTML = "Better bank (" + bankUpgradePrice + ")"; //starter med bankupgrades
                interestButtonEl.addEventListener("click", bankUpgrade); //endrer funk på knapp
                interestButtonEl.removeEventListener("click", interestUpgrade);
            } else {
                interestButtonEl.innerHTML = "Better interest (" + interests[currentInterest+1].price + ")"; //prisen på neste
            }
        }
    }
}

var bankUpgradePrice = 1000000;

function bankUpgrade(){
    if(gold >= bankUpgradePrice){
        gold -= bankUpgradePrice; //fjerner gull
        bankUpgradePrice = bankUpgradePrice * 5; //øker prisen med * 5
        interestButtonEl.innerHTML = "Better bank (" + bankUpgradePrice + ")"; //html
        goldMult = goldMult * 2; //dobler golddrop av enemies
    }
}



var towerMultButtonEl = document.getElementById("towerMultButton");
towerMultButtonEl.addEventListener("click", towerMultUpgrade);

var towerMultPrice = 5000;
towerMultButtonEl.innerHTML = "Upgrade towers [U] (" + towerMultPrice + ")"; //starter button med riktig pris
function towerMultUpgrade() {
    if(gold >= towerMultPrice){
        gold -= towerMultPrice; //tar bort penger
        currentTowerRank++; //upgrader towerrank
        towerMult = towerMult*1.5; //setter dmg til 2x
        towerMultPrice = towerMultPrice*5; //øker pris med 5x
        towerMultButtonEl.innerHTML = "Upgrade towers [U] (" + towerMultPrice + ")"; //endrer html på knapp

        for(var i = 0; i < towers.length; i++){
            towers[i].name = towerRanks[currentTowerRank] + " arrow tower"; //setter om navn på de som finnes
        }
    }
}