//variabler
    var level = 1; //starter på level 1
    var xp = 0; //starter med 0
    var nextLevel = 10; //første level
//variabler slutt

function levelUp(){
    if(xp >= nextLevel){
        xp = 0; //resetter xp
        nextLevel += (25 * level) - 10; //neste level er vanskeligere å nå
        level++;
    }
}