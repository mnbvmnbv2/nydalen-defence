//variabler
    //counter
    var enemyNumber = 0;

    //globale
    var enemySpeed;
    var enemyHealth;
    var enemyGold = 5;
    var enemyPrestige = 0;
    var enemyPrestigeColor; //får mørkere farge av prestige
    var enemyColorRank = 0; //prestigen til fargen for at den skal resettes
    var healthMultiplyer = 1; //for prestigeHP
    //var prestigeHP = 3;

    //x og y visuelt (for å spawne i andre hjørner)
    var enemyX = 0;
    var enemyY = 0;

    var spawnPlaces = 1; //steder på mappet fiender kan spawne
    var spawnPlace = 0; //stedet en enemy spawner (global verdi)

//variabler slutt

//newEnemy();
function newEnemy(){

    //spawn chance
    var chance = Math.random(); //om enemy spawner
    var spawnCornerChance = Math.random(); //hvilket hjørne den spawner i
    var retningChance = Math.random(); //hvilken retning enemy starter i

    //for å spare prosessorkraft så kjører den om en fiende i det hele tatt spawner her oppe
    if(chance <= spawnRate){

    //fart
    enemySpeed = (banditStartSpeed + banditSpeedIncrease) - (enemyLevel * banditSpeedIncrease) + (banditStartSpeed*enemyPrestige);
        if(enemySpeed <= banditMaxSpeed){ //hvis farten er lav så gjør den stor og gi dem prestige
            enemySpeed = banditStartSpeed;
            enemyPrestige++;
            healthMultiplyer = healthMultiplyer * prestigeHP; //health blir prestigeHP^prestige
        }

    //liv
    enemyHealth = (enemyLevel + enemyHealthInc) * healthMultiplyer; //health (med prestige)

    //hpInc
    banditHealth = Math.pow(prestigeHP, enemyPrestige) * Math.floor(Math.pow(enemyLevel, 1.25));

    //gold
    enemyGold = Number((enemyLevel * 5) + (enemyLevel * 2 * enemyPrestige) + (Math.pow(enemyLevel, 1.3))); //gold (med prestige)

    //farge
    enemyPrestigeColor = (85 - (10*enemyPrestige) + (enemyColorRank*85));
        if(enemyPrestigeColor <= 15){
            enemyPrestigeColor = 85;
            enemyColorRank++;
        }

    //spawnPlace
    if(spawnPlaces === 1){ //1
        spawnPlace = UL;
    } else if(spawnPlaces === 2){ //2
        if(spawnCornerChance <= 0.5){
            spawnPlace = UL;
        } else {
            spawnPlace = DR;
        }
    }else if(spawnPlaces === 3){ //3
        if(spawnCornerChance <= 0.33){
            spawnPlace = UL;
        } else if(spawnCornerChance <= 0.67){
            spawnPlace = DR;
        } else {
            spawnPlace = UR;
        }
    }else if(spawnPlaces >= 4){ //4
        if(spawnCornerChance <= 0.25){
            spawnPlace = UL;
        } else if(spawnCornerChance <= 0.50){
            spawnPlace = DR;
        } else if(spawnCornerChance <= 0.75){
            spawnPlace = UR;
        } else {
            spawnPlace = DL;
        }
    }

    //visuellt hvor de spawner
    if(spawnPlace === UL){
        enemyX = blockWidth + 5; //x
        enemyY = blockHeigth + 5; //y
    } else if(spawnPlace === UR){
        enemyX = (blockWidth*gameWidth)-(blockWidth*2) + 5; //x
        enemyY = blockHeigth + 5; //y
        map[UR] = 3;
    } else if(spawnPlace === DL){
        enemyX = blockWidth + 5; //x
        enemyY = (blockHeigth*gameHeigth)-(blockHeigth*2) + 5; //y
        map[DL] = 3;
    } else if(spawnPlace === DR){
        enemyX = (blockWidth*gameWidth)-(blockWidth*2) + 5; //x
        enemyY = (blockHeigth*gameHeigth)-(blockHeigth*2) + 5; //y
        map[DR] = 3;
    }

    //spawner fienden
        var bandit = new EnemyClass(
            enemyLevel, //level
            "Bandit (level: " + enemyLevel + ")", //name
            banditHealth * enemyHealthMult, //health
            banditHealth * enemyHealthMult, //maxHealth
            enemyGold * enemyGoldMult, //gold
            (enemyLevel + (enemyLevel * 3 * enemyPrestige)) * enemyXpMult, //xp
            "Walker", //type
            (enemySpeed / gameSpeed) * enemySpeedMult, //speed
            "hsl("+enemyLevel*5+", 100%," + Number(enemyPrestigeColor) + "%)", //color
            enemyX, //x
            enemyY, //y
            spawnPlace, //mapTile
            enemyNumber, //id
            [], //monsterIntervalArr
            [] //towerIdArr
        )
        //starter bandit i riktig retning (tilfeldig høyre/ned for UL)
        if(spawnPlace === UL){
            if(retningChance < 0.5){
                bandit.moveRight(); 
            } else {
                bandit.moveDown();
            }
        } else if(spawnPlace === UR){
            if(retningChance < 0.5){
                bandit.moveLeft(); 
            } else {
                bandit.moveDown();
            }
        } else if(spawnPlace === DL){
            if(retningChance < 0.5){
                bandit.moveRight(); 
            } else {
                bandit.moveUp();
            }
        } else if(spawnPlace === DR){
            if(retningChance < 0.5){
                bandit.moveLeft(); 
            } else {
                bandit.moveUp();
            }
        }

        enemyNumber++; //stats
        enemies.push(bandit); //så den er sammen med alle enemies for å vises i canvas og bli skadet
    }
    //setTimeout(newEnemy, 10 / gameSpeed); //looper
}