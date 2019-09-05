class EnemyClass { //Dette er de man skal drepe og det er både koden bak og det visuelle
    constructor(level, name, health, maxHealth, gold, xp, type, speed, color, x, y, mapTile, enemyId, monsterIntervalArr, towerIdArr) {
    this.level = level;
    this.name = name;
    this.health = health;
    this.maxHealth = maxHealth;
    this.gold = gold;
    this.xp = xp;
    this.type = type;
    this.speed = speed;
    this.color = color;
    this.x = x;
    this.y = y;
    this.previousX = this.x; //starter som x
    this.previousY = this.y; //starter som y
    this.mapTile = mapTile;
    this.enemyId = enemyId;
    this.monsterIntervalArr = monsterIntervalArr;
    this.towerIdArr = towerIdArr;
}
    detected() {
        var that = this;

        //var intervalID = intervalLokker[intervalLokkerNummer]; //den som gjelder for denne

        for(var i = 0; i < allTowerDetectionGrid.length; i++){ //gjennom den store
            for(var j = 0; j < allTowerDetectionGrid[i].length; j++){ //gjennom de små
                if(allTowerDetectionGrid[i][j] === that.mapTile){ //hvis tårnet kan detecte der monsteret er
                    that.towerIdArr.push(towers[i]); //legger til tårnet i en array
                    //console.log("start the shit");
                    that.monsterIntervalArr.push(setInterval(monsterHit, 1)); //blir truffet til den rømmer
                    setTimeout(function(){monsterStopHit()}, that.speed) //stopper den når monsteret er ute av block
                }
            }
        }

        function monsterStopHit(){
            //console.log(that.monsterIntervalArr);
            clearInterval(that.monsterIntervalArr[0]); //stopper den
            that.monsterIntervalArr.shift(); //fjerner den
            that.towerIdArr.shift(); //fjerner tårnet
        }

        function monsterHit(){
            if(that.health >= 0){ //hvis enemy har hp
                for(var i = 0; i < that.towerIdArr.length; i++){
                    if(that.towerIdArr[i].cooldown <= 0){ //hvis tårnet kan syte
                        that.hit(that.towerIdArr[i].damage); //selvskader uten å gi posisjon eller id
                        that.towerIdArr[i].damageDealt += that.towerIdArr[i].damage; //gir damage til dmg stat på tårn
                        that.towerIdArr[i].cooldown += that.towerIdArr[i].speed; //gir cooldown til tårn
                        that.towerIdArr[i].cooldowner(); //gir tårnet cooldown
                    }
                }
            }
        }
    }
    moveRight() { //koden bak + animasjon
        //console.log(this.name +" moved right");

        var that = this; //for å bruke this i andre funksjoner
        this.previousX = this.x; //for å sjekke at man kommer helt fram til neste

        var starttime; //må være global

        function moveRightAnimation(timestamp, el, dist, duration) {
            var timestamp = timestamp; //hvilken tid man er på
            var runtime = timestamp - starttime;
            var progress = runtime / duration;
            progress = Math.min(progress, 1); //så progress enten er under 1 eller 1
            el.x = Math.round(Number((dist * progress))) + el.previousX; //å glide x til neste
            if (runtime < duration){ // if duration not met yet
                requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                    moveRightAnimation(timestamp, el, dist, duration)
                })
            } else {
                el.x = el.previousX + blockWidth;
                el.movedRight(); //når man er ferdig med move
            }
        }

        requestAnimationFrame(function(timestamp){
            starttime = timestamp;
            moveRightAnimation(timestamp, that, blockWidth, that.speed); // 1 block move over hastigheten this.speed
        })

        this.mapTile += 1; //så den kan sjekke videre (koden bak)
    }
    movedRight(){ //når man har gått så skal den sjekke rutene rundt for videre veier å gå

        if(map[this.mapTile] === 2){ //hvis den går på basen
            this.kill(); //dette er funksjon for å angripe base
        }

        this.detected(); //for å se om den blir angrepet

        var chance = Math.random()*3; //3 tilfeldige veier den kan gå
        if(chance <= 1){
            if(movableTiles.includes(map[this.mapTile+1])){ //om ruten til høyre er sti
                this.moveRight();
            }else if(movableTiles.includes(map[this.mapTile-gameWidth])){ //om ruten over er sti
                this.moveUp();
            }else if(movableTiles.includes(map[this.mapTile+gameWidth])){ //om ruten under er sti
                this.moveDown();
            }
        }
        else if(chance <= 2){
            if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }else if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }else if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }
        }
        else if(chance <= 3){
            if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }else if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }else if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }
        }
    }
    moveLeft() {
        //console.log(this.name +" moved left");
        
        var that = this;
        this.previousX = this.x;

        var starttime;

        function moveLeftAnimation(timestamp, el, dist, duration) {
            var timestamp = timestamp;
            var runtime = timestamp - starttime;
            var progress = runtime / duration;
            progress = Math.min(progress, 1);
            el.x = Math.round(Number((dist * progress))) + el.previousX;
            if (runtime < duration){ // if duration not met yet
                requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                    moveLeftAnimation(timestamp, el, dist, duration)
                })
            } else {
                el.x = el.previousX - blockWidth;
                el.movedLeft();
            }
        }

        requestAnimationFrame(function(timestamp){
            starttime = timestamp;
            moveLeftAnimation(timestamp, that, -blockWidth, that.speed);
        })

        this.mapTile -= 1;
    }
    movedLeft(){

        if(map[this.mapTile] === 2){
            this.kill();
        }

        this.detected();

        var chance = Math.random()*3; //3 tilfeldige veier den kan gå
        if(chance <= 1){
            if(movableTiles.includes(map[this.mapTile-1])){ //om det er sti til venstre
                this.moveLeft();
            }else if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }else if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }
        }
        if(chance <= 2 && chance > 1){
            if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }else if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }else if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }
        }
        if(chance <= 3 && chance > 2){
            if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }else if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }else if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }
        }
    }
    moveDown() {
        //console.log(this.name +" moved down");

        var that = this;
        this.previousY = this.y;

        var starttime;

        function moveDownAnimation(timestamp, el, dist, duration) {
            var timestamp = timestamp;
            var runtime = timestamp - starttime;
            var progress = runtime / duration;
            progress = Math.min(progress, 1);
            el.y = Math.round(Number((dist * progress))) + el.previousY;
            if (runtime < duration){ // if duration not met yet
                requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                    moveDownAnimation(timestamp, el, dist, duration)
                })
            } else {
                el.y = el.previousY + blockHeigth;
                el.movedDown();
            }
        }

        requestAnimationFrame(function(timestamp){
            starttime = timestamp;
            moveDownAnimation(timestamp, that, blockHeigth, that.speed);
        })
        this.mapTile += gameWidth;

    }
    movedDown(){

        if(map[this.mapTile] === 2){
            this.kill();
        }

        this.detected();

        var chance = Math.random()*3; //3 tilfeldige veier den kan gå
        if(chance <= 1){
            if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }else if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }else if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }
        }
        if(chance <= 2 && chance > 1){
            if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }else if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }else if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }
        }
        if(chance <= 3 && chance > 2){
            if(movableTiles.includes(map[this.mapTile+gameWidth])){
                this.moveDown();
            }else if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }else if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }
        }
    }
    moveUp() {
        //console.log(this.name +" moved up");  
        var that = this;
        this.previousY = this.y;

        var starttime;

        function moveUpAnimation(timestamp, el, dist, duration) {
            var timestamp = timestamp;
            var runtime = timestamp - starttime;
            var progress = runtime / duration;
            progress = Math.min(progress, 1);
            el.y = Math.round(Number((dist * progress))) + el.previousY;
            if (runtime < duration){ // if duration not met yet
                requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                    moveUpAnimation(timestamp, el, dist, duration)
                })
            } else {
                el.y = el.previousY - blockHeigth;
                el.movedUp();
            }
        }

        requestAnimationFrame(function(timestamp){
            starttime = timestamp;
            moveUpAnimation(timestamp, that, -blockHeigth, that.speed);
        })
        this.mapTile -= gameWidth;

    }
    movedUp(){

        if(map[this.mapTile] === 2){
            this.kill();
        }

        this.detected();

        var chance = Math.random()*3; //3 tilfeldige veier den kan gå
        if(chance <= 1){
            if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }else if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }else if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }
        }
        if(chance <= 2 && chance > 1){
            if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }else if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }else if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }
        }
        if(chance <= 3 && chance > 2){
            if(movableTiles.includes(map[this.mapTile-1])){
                this.moveLeft();
            }else if(movableTiles.includes(map[this.mapTile+1])){
                this.moveRight();
            }else if(movableTiles.includes(map[this.mapTile-gameWidth])){
                this.moveUp();
            }
        }
    }
    die(){ //går xp, gold stats etc og fjerner monster
        if(this.health <= 0){

            //gir killsStat til tower
            if(this.towerIdArr.length > 0){ //hvis det er ett tårn som drepte (ikke basen)
                this.towerIdArr[0].kills++;
                this.towerIdArr[0].xp += this.xp; //gir xp og levler opp tårn om den kan
                this.towerIdArr[0].levelUp();
            }
            towerStat(); //så man kan se xp på tårn gå opp

            gold += (this.gold * goldDrop * goldMult); //man får gull
            xp += (this.xp * xpDrop); //man får xp
            score += (this.xp * scoreMult); //man får score
            killCount++; //killcount

            levelUp(); //levler opp player om man har nok xp

            delete this.level;
            delete this.name;
            delete this.health;
            delete this.maxHealth;
            delete this.gold;
            delete this.xp;
            delete this.type;
            delete this.speed;
            delete this.color;
            delete this.x;
            delete this.y;
            delete this.previousX;
            delete this.previousY;
            delete this.mapTile;
            delete this.enemyId;
        }
    }
    hit(hitDamage){
        this.health -= (hitDamage * towerMult);
        //console.log(this.name + " is hit for " + hitDamage + " and has " + this.health + " of " + this.maxHealth + " hp left.")
        this.die();
    }
    kill(){
        hp--; //player mister 1 liv
        if(hp <= 0){
            lose();
        }
        this.health = 0; //dreper monsteret
        this.die(); //monster dør (man får xp og penger)
    }
}