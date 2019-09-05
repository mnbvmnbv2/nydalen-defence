//variabler
    var score = 0;
    var killCount = 0;

    //interest
    var interest = interests[currentInterest].interest;
    var interestTime = interests[currentInterest].interestTime;
//variabler slutt

var statsEl = document.getElementById("stats"); //dette er tekstbiten i venstre fane

//statsUpdate(); //starter løkken
function statsUpdate(){ //i fanen til venstre stats
    statsEl.innerHTML = 
    "<font color='blue'>Stage: " + stage + 
    "</font><font color='green'><br>Level: " + level + 
    "</font><font color='aqua'><br>Experience: " + xp.toPrecision(9) + "/" + nextLevel +
    "</font><br><font color='purple'>Score: " + score.toPrecision(9) + 
    "</font><br><font color='gold'>Gold: " + gold.toPrecision(9) +
    "</font><font color='chartreuse'><br>Time: " + min + ":" + sec +
    "</font><font color='pink'><br>HP: " + hp +
    "</font><font color='red'><br>EnemyLevel: " + enemyLevel +
    "</font><font color='gainsboro'><br>SpawnRate: " + spawnRate.toPrecision(9) +
    "</font><font color='blueViolet'><br>GoldDrop: " + goldDrop +
    "</font><font color='cyan'><br>XpDrop: " + xpDrop +
    "</font><font color='coral'><br>EnemyPrestige: " + enemyPrestige +
    "</font><font color='yellowgreen'><br>GameSpeed: " + gameSpeed +
    "</font><br>ActiveTile: " + activeTile + "<br><br>" +
    //interest mm
    "<font color='goldenRod'>Interest: " + interest + " per " + interestTime + " sec." + "<br>" +
    "Next level: " + interests[currentInterest+1].interest + " per " + interests[currentInterest+1].interestTime + " sec.</font>" +
    "<br><br><font color='chartreuse'>GoldMultiplier: " + goldMult + "</font>";
    requestAnimationFrame(statsUpdate); //på repeat
}

//setTimeout(rent, 1000*interestTime / gameSpeed); //starter rentene
/*
function rent(){ //renter man får
    gold += Math.ceil(gold*interest)-gold; //hvor mye
    setTimeout(rent, 1000*interestTime / gameSpeed); //hvor ofte
}
*/


var cannonTowerbutton = document.getElementById("cannonTowerButton");
//cannonTowerbutton.addEventListener("click", help); //for test
function help(){
    hp = 100000;
}

//ved tap
function lose(){
    alert("You Lost!\rStage: " + stage + 
    "\rLevel: " + level + 
    "\rExperience: " + xp + "/" + nextLevel +
    "\rScore: " + score + 
    "\rGold: " + gold +
    "\rTime: " + min + ":" + sec +
    "\rHP: " + hp +
    "\rEnemyLevel: " + enemyLevel +
    "\rGoldDrop: " + goldDrop +
    "\rGameSpeed: " + gameSpeed +
    "\rKillCount: " + killCount + "\r\r" +
    "Interest: " + interest + " per " + interestTime + " sec." +
    "\rGoldMult: " + goldMult)
    location.reload();
}

//pause
var pauseButtonEl = document.getElementById("pauseButton");
pauseButtonEl.addEventListener("click", pause);
function pause(){
    alert("Paused");
}

var speedButtonEl = document.getElementById("speedButton");
speedButtonEl.addEventListener("click", changeSpeed);

function changeSpeed(){
    gameSpeed = prompt("Change speed to:");

    for(var i = 0; enemies.length; i++){
        enemies[i].speed = enemies[i].speed / gameSpeed;
    }
}

function testScript(){ //secret code
    hp = 1000000;
    gold = 100000000;
    spawnPlaces += 10;
    enemyLevel = 230;
    spawnRate = 0.1;
    spawnTime = 1000;
    level = 100000;
}