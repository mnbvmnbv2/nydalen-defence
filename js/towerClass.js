var allTowerDetectionGrid = [];
var towerMult = 1;
var currentTowerRank = 0;
var towerRanks = [
    "Shitty",
    "Broken",
    "Weak",
    "Beginner",
    "Basic",
    "Novice",
    "Apprentice",
    "Journeyman",
    "Expert",
    "Master",
    "Legendary",
    "Linn-Siri",
    "Per Egil"
]
//globale variabler
var levelCounter = 0; 

class TowerClass { //Dette er tårnene
    constructor(towerLevel, level, name, health, maxHealth, damage, xp, maxXp, type, speed, range, h, color, x, y, mapTile, towerId, levelIncreaser, kills, damageDealt, detectionGrid, levelUpDmg, levelUpSpd, levelUpRng, cooldown) {
    this.towerLevel = towerLevel;
    this.level = level;
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.damage = damage;
    this.xp = xp;
    this.maxXp = maxXp;
    this.type = type;
    this.speed = speed;
    this.range = range;
    this.h = h;
    this.color = color;
    this.x = x;
    this.y = y;
    this.mapTile = mapTile;
    this.towerId = towerId;
    this.levelIncreaser = levelIncreaser;
    this.kills = kills;
    this.damageDealt = damageDealt;
    this.detectionGrid = detectionGrid; // array med rutene den overvåker
    this.levelUpDmg = levelUpDmg;
    this.levelUpSpd = levelUpSpd;
    this.levelUpRng = levelUpRng;
    this.cooldown = cooldown;
}

    gridCreate() {
        var widthCheker = 0; //for å sjekke på ny linje
        var checkTile = this.mapTile - Number(gameWidth*this.range + this.range); //ruten som sjekkes (den første)
        for(var i = 0; i < (1+(2*this.range))*(1+(2*this.range)); i++){ //legge til overvåkede ruter

            if(widthCheker === 1+(2*this.range)){ //hopper ned en linje
                checkTile += gameWidth; //ned 1 linje
                checkTile -= 1+(2*this.range); //hopper tilbake rangen
                widthCheker = 0; //resetter counten
            }
            
            if(map[checkTile]===0){
                this.detectionGrid.push(checkTile); //legger til om det er stiTile
            }
            
            widthCheker++; //øker checker
            checkTile++; //øker til neste
        }
        
        allTowerDetectionGrid[this.towerId] = this.detectionGrid; //array indeksert etter tower id i global checker
    }
    levelUpDamage() {
        if(this.level < level){
            gold -= this.levelUpDmg;

            this.level++;
            this.damage++; //øker dmg med 1
            this.h += 10; //farge
            this.levelUpDmg += 100; //øker prisen på dmg

            towerStat();
        } else {
            towerStatsEl.innerHTML = "You need to level up to buy this upgrade!";
        }
    }
    levelUpSpeed() {
        if(this.level < level){
            if(this.speed >= 50){
                gold -= this.levelUpSpd;

                this.level++;
                this.speed -= 5; //hastigheten kvikner
                this.h += 10; //farge
                this.levelUpSpd = Math.round(this.levelUpSpd * 1.25); //pris

                towerStat();
            } else {
                towerStatsEl.innerHTML = "You have reached this tower's max speed!";
            }
        } else {
            towerStatsEl.innerHTML = "You need to level up to buy this upgrade!";
        }
    }
    levelUpRange() {
        if(this.level < level){
            if(this.range < 20){
                gold -= this.levelUpRng;

                this.level++;
                this.range++; //range øker
                this.h += 10; //farge
                this.levelUpRng = this.levelUpRng * 10; //pris øker

                towerStat();
            } else {
                towerStatsEl.innerHTML = "You have reached this tower's max range!";
            }
        } else {
            towerStatsEl.innerHTML = "You need to level up to buy this upgrade!";
        }
    }
    levelUp(){
        if(this.xp >= this.maxXp){ //hvis nok xp
            this.xp = 0; //resetter xp
            this.towerLevel++; //øker towerlvl
            this.maxXp = this.maxXp + (this.towerLevel * 10); //setter neste lvlXP høyere

            levelCounter = 0;
            this.levelIncreaser = 1; //hvor mye mer dmg tårnet skal få
            for(var i = 0; i < this.towerLevel; i++){ //forløkken regner ut 2^(pr 5 lvl)
                levelCounter++;
                if(levelCounter >= 10){
                    levelCounter = 0;
                    this.levelIncreaser = this.levelIncreaser * 2;
                }
            }
            this.damage += 0.2; //legger til dmg
        }
    }
    cooldowner(){
        var that = this;
        //console.log(that.towerId + " is on cooldown");
        setTimeout(downtimer, that.speed / gameSpeed)

        function downtimer(){
            that.cooldown = 0;
        }
    }
}

var occupiedSpace = [];