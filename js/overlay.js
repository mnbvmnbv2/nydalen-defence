//variabler
    cursorOpacity = 0.31;
    cursorClickColor = "blue";
    cursorKeyColor = "red";
//variabler slutt


//det er holderen for alle tiles
var gridOverlayEl = document.getElementById("gridOverlay");

//info om tårnet man har valgt (hover over)
var towerStatsEl = document.getElementById("towerStats");

//lager grid overlay for å kunne klikke på tiles 
for(var i = 0; i < gameWidth*gameHeigth; i++){
    //var testColor = i*((gameHeigth*gameWidth)/360); //for å se at de wrapper riktig
    var clickableTile = document.createElement("div"); //lager div
    clickableTile.id = i; //gir tall id likt som map arrayen de er over
    clickableTile.classList.add("clickableTiles"); //så man skal hente de i en array
    clickableTile.style.width = blockWidth + "px"; //bredde
    clickableTile.style.height = blockHeigth + "px"; //høyde
    //clickableTile.style.backgroundColor = "hsl("+testColor+",80%,50%)"; //farge
    clickableTile.style.opacity = cursorOpacity; //gjennomsiktighet
    clickableTile.addEventListener("click",tileClick); //så man kan targete/velge en tile
    gridOverlayEl.appendChild(clickableTile); //legger de inn i holderen
}

var gridTiles = document.getElementsByClassName("clickableTiles") //henter arrayen med alle clickables

var arrowTowerButtonEl = document.getElementById("arrowTowerButton"); //knappen for å kjøpe tårn
var activeTile; //tilen man har valgt (er "false" om det ikke er valgt)
activeTileMove(gridTiles[1]); //for å starte ett sted

function tileClick(e){ //når man klikker på en tile (skal være for å kunne kjøpe ting og sånt)
    //console.log("This is: " + e.target.id); //skriver i console hvilken tile det er

    for(var i = 0; i < gridTiles.length; i++){ //fjerner fargen på alle
        gridTiles[i].style.backgroundColor = "transparent";
    }

    e.target.style.backgroundColor = cursorClickColor; //cursor

    activeTile = Number(e.target.id); //så man har iden til den aktiverte tilen

    towerStat();
}

function activeTileMove(thaTile){ //når man klikker på en tile (skal være for å kunne kjøpe ting og sånt)
    //console.log("This is: " + thaTile.id); //skriver i console hvilken tile det er

    for(var i = 0; i < gridTiles.length; i++){ //fjerner fargen på alle
        gridTiles[i].style.backgroundColor = "transparent";
    }

    thaTile.style.backgroundColor = cursorKeyColor; //cursor

    activeTile = Number(thaTile.id); //så man har iden til den aktiverte tilen

    towerStat();
}

//hvis det er tårn på tile. gjør klar for upgrades og man kan se statsene dens
function towerStat(){
    if(occupiedSpace.includes(activeTile)){
        for(var i = 0; i < towers.length; i++){
            if(towers[i].mapTile === activeTile){
                towerStatsEl.innerHTML = "Name: " + towers[i].name + "<br>" +
                "TowerLevel: " + towers[i].towerLevel + "<br>" +
                "Xp: " + towers[i].xp + "/" + towers[i].maxXp + "<br>" +
                "Level: " + towers[i].level + "<br>" +
                "Damage: " + (towers[i].damage * towerMult) + "<br>" +
                "Speed: " + towers[i].speed + "<br>" +
                "Range: " + towers[i].range + "<br>" +
                "Kills: " + towers[i].kills + "<br>" +
                "Damage Dealt: " + towers[i].damageDealt + "<br>" +
                "TowerId: " + towers[i].towerId + "<br><br>" +
                //"DetectionGrid: " + towers[i].detectionGrid + "<br><br>" +
                //upgrades:
                "Level up damage: " + towers[i].levelUpDmg + "<br>" +
                "Level up speed: " + towers[i].levelUpSpd + "<br>" +
                "Level up range: " + towers[i].levelUpRng;
            }
        }
    } else if(map[activeTile] === 0){
        towerStatsEl.innerHTML = "Path";
    } else if(map[activeTile] === 2){
        towerStatsEl.innerHTML = "Base";
    } else if(map[activeTile] === 3){
        towerStatsEl.innerHTML = "Hole";
    } else if(map[activeTile] === 4){
        towerStatsEl.innerHTML = "Tree - remove for " + removeCost;
    } else if(map[activeTile] === 5){
        towerStatsEl.innerHTML = "Boulder - remove for " + removeCost;
    } else if(map[activeTile] === 9){
        towerStatsEl.innerHTML = "Lava";
    } else if(map[activeTile] === 10){
        towerStatsEl.innerHTML = "Lava hole";
    } else {
        towerStatsEl.innerHTML = "Free spot";
    }
}