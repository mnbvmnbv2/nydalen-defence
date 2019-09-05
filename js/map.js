/*
map =   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1
    ,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1
    ,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1
    ,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1
    ,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1
    ,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1
    ,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1
    ,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1
    ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]; 
*/

var map = []; //global array
var gameWidth = 20; //antall blocks bredde
var gameHeigth = 20; //antall blocks høyde

//maptiles for spawns
var UL = 21; //UpLeft
var UR = 38; //UpRight
var DL = 361; //DownLeft
var DR = 378; //DownRight

function setMap(){
    if(stage === 1){
        map =   [1,1,1,5,1,4,1,1,1,4,4,1,1,1,1,1,4,1,1,1
            ,1,3,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1
            ,1,0,0,0,0,1,1,5,0,0,0,1,1,5,1,5,1,0,0,1
            ,4,0,1,1,0,1,4,0,0,1,0,1,0,0,0,0,0,1,0,4
            ,4,0,0,0,0,1,4,0,1,5,0,1,0,1,4,1,0,5,0,1
            ,1,4,1,0,1,1,1,0,4,1,0,0,0,0,0,0,0,1,0,1
            ,5,0,0,0,0,0,0,0,4,1,0,1,1,1,0,1,4,1,0,4
            ,5,0,1,1,1,0,1,1,1,5,0,1,5,1,0,0,0,1,0,1
            ,1,0,0,0,0,0,0,0,0,2,2,1,4,5,0,1,0,0,0,1
            ,4,1,0,1,4,1,1,1,1,2,2,0,0,1,0,1,1,5,1,1
            ,1,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,1,4
            ,4,0,1,0,0,0,1,0,1,0,0,0,1,1,0,1,1,0,1,4
            ,1,0,5,4,1,1,1,0,0,0,1,0,1,5,0,4,1,0,4,1
            ,1,0,0,0,0,0,0,1,0,1,5,0,0,0,0,1,1,0,1,1
            ,1,0,1,1,0,1,0,4,0,1,5,0,1,1,0,1,0,0,0,1
            ,1,0,0,5,0,1,0,1,0,1,1,0,4,1,0,0,0,1,0,5
            ,4,1,0,1,0,5,0,0,0,0,1,0,1,1,0,1,5,1,0,1
            ,1,0,0,1,0,1,1,1,5,0,0,0,0,0,0,0,1,0,0,1
            ,4,0,0,0,0,1,1,4,1,1,1,1,1,4,1,0,0,0,0,1
            ,1,1,1,1,4,1,4,1,4,4,4,1,5,5,1,1,4,1,1,1
        ];      
    } else if(stage === 2){
        map = [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8
            ,8,10,9,8,9,9,9,9,8,8,8,8,9,9,9,9,8,9,10,8
            ,8,9,9,9,9,8,8,9,9,9,9,9,9,8,8,9,9,9,9,8
            ,8,8,9,8,8,8,9,9,8,8,8,8,9,9,8,8,8,9,8,8
            ,8,9,9,8,8,8,9,8,8,8,8,8,8,9,8,8,8,9,9,8
            ,8,9,8,9,9,9,9,8,9,9,9,9,8,9,9,9,9,8,9,8
            ,8,9,9,9,8,8,9,8,9,8,8,9,8,9,8,8,9,9,9,8
            ,8,8,8,9,9,9,9,9,9,8,8,9,9,9,9,9,9,8,8,8
            ,8,8,8,8,8,9,8,8,9,9,9,9,8,9,8,8,9,8,8,8
            ,8,8,8,8,9,9,9,9,9,2,2,9,9,9,9,8,9,8,8,8
            ,8,8,8,8,9,8,8,8,9,2,2,9,8,8,9,9,9,8,8,8
            ,8,8,8,8,9,8,8,8,9,9,9,9,8,8,9,8,8,8,8,8
            ,8,8,8,9,9,9,8,8,9,8,8,9,8,8,9,9,9,8,8,8
            ,8,9,9,9,8,9,9,9,9,9,9,9,9,9,9,8,9,9,9,8
            ,8,9,8,9,8,8,9,8,8,8,8,8,8,9,8,8,9,8,9,8
            ,8,9,9,9,9,9,9,9,8,8,8,8,9,9,9,9,9,9,9,8
            ,8,8,9,8,9,8,8,9,9,9,9,9,9,8,8,9,8,9,8,8
            ,8,9,9,9,9,8,8,9,8,8,8,8,9,8,8,9,9,9,9,8
            ,8,10,9,8,9,9,9,9,9,9,9,9,9,9,9,9,8,9,10,8
            ,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8
        ]; 
    } else if(stage === 3){
        gameWidth = 10;
        gameHeigth = 10;

        UL = 11; //UpLeft
        UR = 18; //UpRight
        DL = 81; //DownLeft
        DR = 88; //DownRight
        map = [1,1,1,1,1,1,1,1,1,1
            ,1,0,0,0,0,1,1,0,0,1
            ,1,0,0,1,0,1,1,0,0,1
            ,1,1,1,0,0,0,0,1,0,1
            ,1,1,1,0,2,2,0,0,0,1
            ,1,0,0,0,2,2,0,1,1,1
            ,1,0,1,0,0,0,0,1,1,1
            ,1,0,0,1,1,0,1,0,0,1
            ,1,0,0,1,1,0,0,0,0,1
            ,1,1,1,1,1,1,1,1,1,1
        ]; 
    }
}

var enemies = []; //alle fiender skal inn så de kan komme på canvas
var towers = []; //samme for towers

var tileTypes = {
0 : "dirt.png",
1 : "grass1.png",
2 : "base.png",
3 : "hole.png",
4 : "tree.png",
5 : "rock.png",
8 : "hell.png",
9 : "lava1.png",
10 : "lavaWarp.png"
} //fargen på block types
var movableTiles = [
    0,2,3,9
]

//gress
var gressNummer = 1;
gressEndrer();
function gressEndrer(){
    gressNummer++;
    if(gressNummer === 7){
        gressNummer = 1;
    }
    tileTypes[1] = "grass" + gressNummer + ".png";
    setTimeout(gressEndrer, 200);
}

//base
var baseNummer = 1;
baseEndrer();
function baseEndrer(){
    baseNummer++;
    if(baseNummer === 5){
        baseNummer = 1;
    }
    tileTypes[2] = "base" + baseNummer + ".png";
    if(baseNummer === 1){
        setTimeout(baseEndrer, 200);
    } else if(baseNummer === 2){
        setTimeout(baseEndrer, 150);
    } else if(baseNummer === 3){
        setTimeout(baseEndrer, 100);
    } else if(baseNummer === 4){
        setTimeout(baseEndrer, 150);
    }
}

//lava
var lavaNummer = 1;
lavaEndrer();
function lavaEndrer(){
    lavaNummer++;
    if(lavaNummer === 5){
        lavaNummer = 1;
    }
    tileTypes[9] = "lava" + lavaNummer + ".png";
    setTimeout(lavaEndrer, 200);
}

//bandit
var banditNummer = 1;
var banditImg = new Image();
banditImg.src = "bilder/bandit" + banditNummer + ".png";
banditEndrer();
function banditEndrer(){
    banditNummer++;
    if(banditNummer === 3){
        banditNummer = 1;
    }
    banditImg.src = "bilder/bandit" + banditNummer + ".png";
    setTimeout(banditEndrer, 200);
}


var gameEl = document.getElementById("game"); //henter canvas
var ctx = gameEl.getContext("2d"); //setter canvas 2d
var blockWidth = gameEl.clientWidth/gameWidth; //hvor bred en block er
var blockHeigth = gameEl.clientHeight/gameHeigth; //hvor høy en block er

var blockCount = 0; //trenger for fillRect i map
var line = 0; //trenger for fillRect i map

var textHeigth = 18;
var textWidth = 2;

//drawMap(); //lager mappet første gang og starter loopen

function drawMap(){
    blockCount = 0; //må resetes
    line = 0; //må resetes
    for(var i = 0; i < map.length ; i++){ //fyller kartet

        if(blockCount === gameWidth){ //starter ny linje
            blockCount = 0;
            line++;
        }

        var immg = new Image();
        immg.src = "bilder/" + tileTypes[map[i]]; //setter riktig farge

        ctx.drawImage(immg, blockCount*blockWidth, line*blockHeigth, blockWidth, blockHeigth); //putter inn en block
        blockCount++;

    }
    for(var i = 0; i < enemies.length; i++){ //henter alle enemies
        //lager firkanten

        ctx.fillStyle = enemies[i].color; //setter firkanten i riktig farge
        
        ctx.fillRect(enemies[i].x,enemies[i].y,blockWidth-10,blockHeigth-10); //for fargefirkanter
        //ctx.drawImage(banditImg,enemies[i].x,enemies[i].y,blockWidth-10,blockHeigth-10); //for bilder

        //hp i firkant
        ctx.fillStyle = "black"; //farge på text
        if(enemies[i].health != undefined){ //hvis fienden lever
            //endrer størrelse på livene
            if(enemies[i].health.toFixed(1).length >= 10){
                ctx.font = "5px arial";
                textWidth = 1;
            } else if(enemies[i].health.toFixed(1).length >= 9){
                ctx.font = "7px arial";
                textWidth = 1;
            } else if(enemies[i].health.toFixed(1).length >= 8){
                ctx.font = "8px arial";
                textWidth = 1;
            } else if(enemies[i].health.toFixed(1).length >= 7){
                ctx.font = "10px arial";
                textWidth = 1;
            } else if(enemies[i].health.toFixed(1).length >= 6){
                ctx.font = "10px arial";
                textWidth = 3;
            } else if(enemies[i].health.toFixed(1).length >= 5){
                ctx.font = "10px arial";
                textWidth = 6;
            } else if(enemies[i].health.toFixed(1).length >= 4){
                ctx.font = "10px arial";
                textWidth = 9;
            } else {
                ctx.font = "10px arial";
                textWidth = 12;
            }
            ctx.fillText(Math.ceil(enemies[i].health), enemies[i].x+textWidth, enemies[i].y+textHeigth); //text
        }
    }
    for(var i = 0; i < towers.length; i++){ //henter alle towers
        ctx.fillStyle = "hsl(" + towers[i].h + ", 100%, " + towers[i].color + ")"; //setter firkanten i riktig farge
        ctx.fillRect(towers[i].x,towers[i].y,blockWidth-10,blockHeigth-10); //lager firkanten
    }

    requestAnimationFrame(drawMap); //går på repeat
}

function mapKoor(tileId){
    var blockCountKoor = 0; //må resetes
    var lineKoor = 0; //må resetes

        for(var i = 0; i < tileId; i++){ //finner linje og block
    
            blockCountKoor++;

            if(blockCountKoor === gameWidth){ //starter ny linje
                blockCountKoor = 0;
                lineKoor++;
            }
        }

    var koordinater = {
        x : blockCountKoor*blockWidth+5,
        y : lineKoor*blockHeigth+5
    }
    return koordinater; //sender x og y koordinat til tilen
}