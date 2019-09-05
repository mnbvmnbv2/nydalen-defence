//
var frame = 0; //count til 60 for hz
var sec = 0;
var min = 0;
var tick = 0; //total for å ha gametime
var fps = 60;

//for å styre fps
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

//timeIncrement();
function timeIncrement(){ //for å ha en timer func

    requestAnimationFrame(timeIncrement);
     
    now = Date.now();
    delta = now - then;

    if(delta > interval){

        then = now - (delta % interval);

        frame += 1 * gameSpeed; //øker frame (med gameSpeed)
        tick += 1 * gameSpeed; //øker tick (med gameSpeed)
        for(var i = 0; i < gameSpeed * 10; i++){
            newEnemy(); //sjanse for å spawne en enemy
        }

        if(frame >= fps){ //øker sekunder
            frame = 0; //reset
            sec++; //øker sec
            score += ((enemyLevel-1) * scoreMult); //gir score pr sek

            if((sec % interestTime) === 0){
                gold = gold * interest;
            }
        }
        if(sec >= 60){
            sec = 0;
            min++;
        }

        //spawnRateIncrease
        spawnRate = Math.min(baseSpawnRate + (Math.floor(tick / spawnRateIncTime) * spawnRateIncRate), maxSpawnRate);
        //fungerende spawnrate er den høyeste av 2 verdier der den ene er max raten og den andre er scaling fra base
        

        //enemyLevel
            var enemyLevel1Script = baseEnemyLevel + (Math.floor(tick / diffIncTime)); //0+
            var enemyLevel2Script = baseEnemyLevel + (Math.floor(1.5 * (tick / diffIncTime))) - 10; //20+
            var enemyLevel3Script = baseEnemyLevel + (Math.floor(2 * (tick / diffIncTime))) - 60; //100+
            var enemyLevel4Script = baseEnemyLevel + (Math.floor(3 * (tick / diffIncTime))) - 260; //200+
            var enemyLevel5Script = baseEnemyLevel + (Math.floor(4 * (tick / diffIncTime))) - 560; //300+
            var enemyLevel6Script = baseEnemyLevel + (Math.floor(5 * (tick / diffIncTime))) - 1060; //500+
        //diffIncrease
        enemyLevel = Math.max(enemyLevel1Script, enemyLevel2Script, enemyLevel3Script, enemyLevel4Script, enemyLevel5Script, enemyLevel6Script);
        //enemylvl legger til x hver gang diffIncTime
        //den er multilineær

        //enemyHealth
        enemyHealth = baseEnemyHealth + (tick / enemyHealthIncTime) + min;
        //mangler at den er eksponensiell

        //hvor mange steder de kan spawne
        if(tick === firstSpawnTime){ //når det har gått så og så mange sekunder
            spawnPlaces++;
        } else if(tick === secondSpawnTime){
            spawnPlaces++;
        } else if(tick === thirdSpawnTime){
            spawnPlaces++;
        }

    }
    
}

