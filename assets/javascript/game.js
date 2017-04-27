
 var lost = {
    video   : '<iframe width="400" height="200" src="http://www.youtube.com/embed/di14EZRpMVo?autoplay=1" frameborder="0" allowfullscreen></iframe>'
 }

 var korn ={
     name   : "Korn",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/SGK00Q7xx-s?autoplay=1" frameborder="0" allowfullscreen></iframe>',

     hints  : [" Got a life? "," Started in San Bernandino "," Jonathan Davis "," 4 letter band "]
 }

 var godsmack ={
     name   : "Godsmack",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/opU1urLhw50?autoplay=1" frameborder="0" allowfullscreen></iframe>',

     hints  : [" Vodoo "," smack "," God "," Navy theme song "]
 }

 var incubus={
     name   : "Incubus",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/fgT9zGkiLig?autoplay=1" frameborder="0" allowfullscreen></iframe>',
     hints  : [" Pardon Me ", " Drive "," Make Yourself "," Brand Boyd "]
 }

 var bands =[
     incubus, godsmack, korn
 ]


 /*******
  *
  * @param rand -  random pic band to be guessed.  Used for the hints
  * @param arrAnswer - array of blanks with the length of the band name
  *
  *******/
 function startGame(rand, winArray, arrBlank){
     var triesCtr=10
     var alphaExp=/^[0-9a-zA-Z]+$/;
     var arrUserGuess=[]
     var score=0
     var guessedLetter


     document.getElementById("hints").innerHTML= "<h3>HINTS</h3> "+ bands[rand].hints
     document.getElementById("instructions").innerHTML = ""
     document.getElementById("tries").innerHTML=triesCtr + " tries Remaining"


     document.onkeyup=function(evt){

         if(evt.key && checkLetter( winArray , evt.key)  ){

             guessedLetter = replaceArray(arrBlank,findArrayIndexs(evt.key, winArray), evt.key).toString()
             guessedLetter = guessedLetter.replace(",","")
             document.getElementById("guess-letter").innerHTML= guessedLetter

         }else if( evt.key.length == 1 && evt.key.length != " " && alphaExp.test(evt.key)   ) {
             arrUserGuess.push( evt.key ) //create an array guessed letters
             triesCtr--
             document.getElementById("tries").innerHTML=triesCtr + " tries Remaining"
             alreadyGuessed(arrUserGuess,evt.key)
         }

         if(arrBlank.indexOf('_') < 0){
             document.getElementById("tries").innerHTML=""
             document.getElementById("game-result").innerHTML=bands[rand].video
             document.getElementById("guess-letter").innerHTML="<h1>GOOD JOB!</h1>"

         }
         if(triesCtr == 0){
             document.getElementById("tries").innerHTML=""
             document.getElementById("game-result").innerHTML=lost.video
             document.getElementById("guess-letter").innerHTML="<h1>SORRY YOU HAVE NO MORE TRIES ENJOY!</h1>"

         }
     }
 }

 function alreadyGuessed(arrUserGuess,key){

     if(arrUserGuess.indexOf(key) < 0 ){
         document.getElementById("letter-guessed").innerHTML=key_
     }

 }


 /**
  *
  * @param arrBlank -  Array of _
  * @param indexArr - indexes of where the letter was found
  * @param key      - key that was found
  * @returns {*}    - new array of blank laters with the key
  */
 function replaceArray(arrBlank, indexArr, key){
     for(var i = 0; i < indexArr.length; i++ ){
         var keyIndex = indexArr[i]
         arrBlank[keyIndex] = key
     }
     return arrBlank
 }


 function findArrayIndexs(key,arrAnswer){
     var index=[]
     for (var i=0; i< arrAnswer.length; i++){
         if( arrAnswer[i]== key || key.toUpperCase() == arrAnswer[i]  ){
             index.push(i)
         }
     }
     return index
 }

 /**
  *
  * @param correctAnswer - correct answer array
  * @param userInput - from the keyboard
  * @returns {boolean}
  */

 function checkLetter(correctAnswer, userInput){
     var exist = false
     for (var i=0; i< correctAnswer.length; i++){
         if( correctAnswer[i]== userInput || userInput.toUpperCase() == correctAnswer[i]  ){
             exist=true
         }
     }
     return exist
 }


 function generateblankLetters(rand){
     var bandName = bands[rand].name
     var arrBlank=[]
     var blank="_"

     var letters=document.createElement("div")
         letters.setAttribute("id","hint-letters")
     for(var i=0; i<bandName.length;i++){
         if(!bandName[i] == " ") {
             blank += "_"
             arrBlank.push("_")
         }
     }
     document.getElementById("guess-letter").innerHTML=blank
     console.log(arrBlank)
     return arrBlank
 }


 function generateWinningArray (rand) {
     var bandName = bands[rand].name
     var winArray=[]
     for(var i=0; i<bandName.length;i++){
         if(!bandName[i] == " "){
             winArray.push(bandName[i])
         }
     }
     return winArray
 }


 function initGame(){
     var rand = Math.floor(Math.random() * 3)
     document.getElementById("instructions").innerHTML = "<h1>Press any key to Play the best game ever</h1>"
     document.onkeyup = function(evt) {
         if(evt.key){
             arrBlank = generateblankLetters(rand)
             winArray = generateWinningArray(rand)
             startGame(rand , winArray,arrBlank)
         }
     }
 }




