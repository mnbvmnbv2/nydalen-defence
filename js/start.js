//hvor vanskelig spillet er skal endre denne
var scoreMult = 1;
//upgrade i bank
var goldMult = 1;

//bomuser på vanskelighet etc.
var enemyHealthMult = 1; // * på health og maxhealth
var enemyGoldMult = 1; // * på enemyGold
var enemyXpMult = 1; // * på enemyXp
var enemySpeedMult = 1; // * på enemySpeed

//enemySpawn variabler
var baseSpawnRate = 0.0004 //0.0004
var spawnRate = baseSpawnRate; 
var baseDiffIncTime = 600; //600 (øker enemylvl)
var diffIncTime = baseDiffIncTime;

/*
var diffIncIncTime = 100000;
var maxDiffIncTime = 4000;

var healthIncIncTime = 400000;
*/

var prestigeHP = 2;

var firstSpawnTime = 18000;
var secondSpawnTime = 24000;
var thirdSpawnTime = 40000;

//enemyScaling
var baseEnemyLevel = 1;
var baseEnemyHealth = 1;
var baseBanditHealth = 0;
var enemyHealthInc = 0; //1 for den blir 2 med en gang
var enemyHealthIncTime = 1000;

//spawnRateIncrease variabler
var spawnRateIncTime = 3000;
var spawnRateIncRate = 0.00012;
var maxSpawnRate = 0.03;

//bandit speed variabler
var banditStartSpeed = 1500; //1500
var banditMaxSpeed = 1000; //100
var banditSpeedIncrease = 5; //5



//gameSpeed
    var gameSpeedSliderEl = document.getElementById("gameSpeedSlider"); //slider
    var gameSpeedInputEl = document.getElementById("gameSpeedInput"); //input:number
    var gameSpeedNumberEl = document.getElementById("gameSpeedNumber"); //html
    var gameSpeed = 1; //var som brukes i spillet

    gameSpeedSliderEl.oninput = function() { //når man drar i slider
        gameSpeed = (gameSpeedSliderEl.value / 2); //endrer var
        gameSpeedNumberEl.innerHTML = "GameSpeed:" + gameSpeed; //endrer html
        gameSpeedInputEl.value = gameSpeed; //endrer input:number

    }

    gameSpeedInputEl.addEventListener("change", gameSpeedChange); //når man endrer input:number
    function gameSpeedChange(){
        gameSpeed = gameSpeedInputEl.value; //endrer var
        gameSpeedNumberEl.innerHTML = "GameSpeed:" + gameSpeed; //endrer html
    }

//goldDrop
    var goldDropSliderEl = document.getElementById("goldDropSlider");
    var goldDropInputEl = document.getElementById("goldDropInput");
    var goldDropNumberEl = document.getElementById("goldDropNumber");
    var goldDrop = 1;

    goldDropSliderEl.oninput = function() {
        goldDrop = (goldDropSliderEl.value / 5);
        goldDropNumberEl.innerHTML = "GoldDrop: " + goldDrop;
        goldDropInputEl.value = goldDrop;
    }

    goldDropInputEl.addEventListener("change", goldDropChange);
    function goldDropChange(){
        goldDrop = goldDropInputEl.value;
        goldDropNumberEl.innerHTML = "GoldDrop: " + goldDrop;
    }

//xpDrop
    var xpDropSliderEl = document.getElementById("xpDropSlider");
    var xpDropInputEl = document.getElementById("xpDropInput");
    var xpDropNumberEl = document.getElementById("xpDropNumber");
    var xpDrop = 1;

    xpDropSliderEl.oninput = function() {
        xpDrop = (xpDropSliderEl.value / 5);
        xpDropNumberEl.innerHTML = "XpDrop: " + xpDrop;
        xpDropInputEl.value = xpDrop;
    }

    xpDropInputEl.addEventListener("change", xpDropChange);
    function xpDropChange(){
        xpDrop = xpDropInputEl.value;
        xpDropNumberEl.innerHTML = "XpDrop: " + xpDrop;
    }

//enemyLevel
    var enemyLevelSliderEl = document.getElementById("enemyLevelSlider");
    var enemyLevelInputEl = document.getElementById("enemyLevelInput");
    var enemyLevelNumberEl = document.getElementById("enemyLevelNumber");
    var enemyLevel = 0;

    enemyLevelSliderEl.oninput = function() {
        enemyLevel = (enemyLevelSliderEl.value * 11) - 10;
        enemyLevelNumberEl.innerHTML = "EnemyLevel: " + enemyLevel;
        enemyLevelInputEl.value = enemyLevel;
    }

    enemyLevelInputEl.addEventListener("change", enemyLevelChange);
    function enemyLevelChange(){
        enemyLevel = enemyLevelInputEl.value;
        enemyLevelNumberEl.innerHTML = "EnemyLevel: " + enemyLevel;
    }

//gold
    var goldSliderEl = document.getElementById("goldSlider");
    var goldInputEl = document.getElementById("goldInput");
    var goldNumberEl = document.getElementById("goldNumber");
    var gold = 2000;

    goldSliderEl.oninput = function() {
        gold = (goldSliderEl.value * 500);
        goldNumberEl.innerHTML = "Gold: " + gold;
        goldInputEl.value = gold;
    }

    goldInputEl.addEventListener("change", goldChange);
    function goldChange(){
        gold = Number(goldInputEl.value);
        goldNumberEl.innerHTML = "Gold: " + gold;
    }

//stage
    var stageSliderEl = document.getElementById("stageSlider");
    var stageInputEl = document.getElementById("stageInput");
    var stageNumberEl = document.getElementById("stageNumber");
    var stage = 1;

    stageSliderEl.oninput = function() {
        stage = Number(stageSliderEl.value);
        stageNumberEl.innerHTML = "Stage: " + stage;
        stageInputEl.value = stage;
    }

    stageInputEl.addEventListener("change", stageChange);
    function stageChange(){
        stage = Number(stageInputEl.value);
        stageNumberEl.innerHTML = "Stage: " + stage;
    }

//level
    var levelSliderEl = document.getElementById("levelSlider");
    var levelInputEl = document.getElementById("levelInput");
    var levelNumberEl = document.getElementById("levelNumber");
    var level = 1;

    levelSliderEl.oninput = function() {
        level = Number(levelSliderEl.value);
        levelNumberEl.innerHTML = "Level: " + level;
        levelInputEl.value = level;
    }

    levelInputEl.addEventListener("change", levelChange);
    function levelChange(){
        level = levelInputEl.value;
        levelNumberEl.innerHTML = "Level: " + level;
    }

//hp
    var hpSliderEl = document.getElementById("hpSlider");
    var hpInputEl = document.getElementById("hpInput");
    var hpNumberEl = document.getElementById("hpNumber");
    var hp = 10;

    hpSliderEl.oninput = function() {
        hp = Number(hpSliderEl.value);
        hpNumberEl.innerHTML = "Hp: " + hp;
        hpInputEl.value = hp;
    }

    hpInputEl.addEventListener("change", hpChange);
    function hpChange(){
        hp = hpInputEl.value;
        hpNumberEl.innerHTML = "Hp: " + hp;
    }


var song1 = new Audio('music/backgroundMusic2.mp3');

//start
//overlay
var startScreenEl = document.getElementById("startScreen");

//knappen nede
var closeButtonEl = document.getElementById("closeButton");
closeButtonEl.addEventListener("click", closeMenu);

function closeMenu(){
    startScreenEl.style.zIndex = -10; //putter den bak spillet
    startScreenEl.style.visibility = "hidden"; //gjør den usynlig
    closeButtonEl.removeEventListener("click", closeMenu); //fjerner knappeklikk
    closeButtonEl.style.visibility = "hidden"; //gjør den usynlig

    statsUpdate(); //tar fram penger etc.
    setMap();
    drawMap(); //lager mappet første gang og starter loopen

    song1.loop = true;
    song1.volume = 0.4;
    //song1.play();
}

var startButtonEl = document.getElementById("startButton");
startButtonEl.addEventListener("click", startGame);

function startGame(){
        startButtonEl.style.visibility = "hidden"; //gjør den usynlig
        startButtonEl.style.zIndex = -11; //putter den bak (så man kan klikke på grid)
        startButtonEl.removeEventListener("click", startGame); //fjerner klikking

        //øker hastigheten enemies øker lvl med
        //difficultyIncreaseIncrease()

        //øker health enemies øker med
        //enemyHealthIncreaseIncreaser(),

        //newEnemy(); //starter waves


        //script
        timeIncrement(); //spilltid funksjonen

        //setTimeout(rent, 1000*interestTime / gameSpeed); //starter rentene
}