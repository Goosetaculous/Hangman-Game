
 var lost = {
    video   : '<iframe width="400" height="200" src="http://www.youtube.com/embed/di14EZRpMVo?autoplay=1&&controls=0" frameborder="0" allowfullscreen></iframe>'
 }

 var ramones ={
     name   : "Ramones",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/iymtpePP8I8?autoplay=1" frameborder="0" allowfullscreen></iframe>',
     hints  : [" Blitzkrieg Bop "," I Wanna Be Sedated "," Johnny Ramone "," <--just add an 's' "]
 }

 var staticX ={
     name   : "StaticX",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/Ps0MfBG5-Uo?autoplay=1" frameborder="0" allowfullscreen></iframe>',
     hints  : [" Push It "," Cold "," Wayne Static "," Cannibal Album "]
 }

 var Evanescence ={
     name   : "Evanescence",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/3YxaaGgTQYM?autoplay=1" frameborder="0" allowfullscreen></iframe>',
     hints  : [" Amy Lee "," Bring Me to Life "," My Immortal "]
 }


 var metallica ={
     name   : "Metallica",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/CD-E-LDc384?autoplay=1" frameborder="0" allowfullscreen></iframe>',
     hints  : [" Enter Sandman "," James Hetfield "," Nothing Else Matters "," Lars Ulrich "]
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

 var bands =[incubus, godsmack, ramones, staticX, metallica, Evanescence ,korn]


 /*******
  *
  * @param rand -  random pic band to be guessed.  Used for the hints
  * @param arrAnswer - array of blanks with the length of the band name
  *
  *******/
 function startGame(rand, winArray, arrBlank ,score){
     var triesCtr=10
     var alphaExp=/^[0-9a-zA-Z]+$/;
     var arrUserGuess=[]
     var guessedLetter
     var alreadyPlayed=[rand]
     document.getElementById("hints").innerHTML= "<h3>HINTS</h3><h2>"+ bands[rand].hints + "</h2>"
     document.getElementById("instructions").innerHTML = ""
     document.getElementById("tries").innerHTML="<h3>"+ triesCtr + " tries Remaining </h3>"
     document.getElementById("already-guessed").innerHTML=""
     document.onkeyup=function(evt){
         PlaySound()
         if(evt.key && checkLetter( winArray , evt.key)  ){
             guessedLetter = replaceArray(arrBlank,findArrayIndexs(evt.key, winArray), evt.key).toString()
             guessedLetter = replaceAll(guessedLetter,",")
             document.getElementById("guess-letter").innerHTML= "<h1>"+guessedLetter+"</h1>"
             document.getElementById("guess-letter").style.color = "white"
             userInputLetters(arrUserGuess,evt.key)
             arrUserGuess.push(evt.key)

         }else if( evt.key.length == 1 && evt.key.length != " " && alphaExp.test(evt.key)   ) {
             arrUserGuess.push( evt.key )
             triesCtr--
             document.getElementById("tries").innerHTML="<h3>"+ triesCtr + " tries Remaining </h3>"
             userInputLetters(arrUserGuess,evt.key)
             arrUserGuess.push(evt.key)

         }
         // Player guessed correctly
         if(arrBlank.indexOf('_') < 0){
             score++
             document.getElementById("tries").innerHTML=""
             document.getElementById("hints").innerHTML=bands[rand].video
             document.getElementById("guess-letter").innerHTML="<h3>GOOD JOB!</h3>"
             document.getElementById("score").innerHTML="<h4>SCORE: "+score+"</h4>"
             playAgain(score,rand,alreadyPlayed)

         }
         if(triesCtr == 0){
             document.getElementById("tries").innerHTML=""
             document.getElementById("hints").innerHTML=lost.video
             document.getElementById("guess-letter").innerHTML="<h3>You didn't guess it right!! Suffer the consequence!</h3>"
             document.getElementById("guess-letter").style.color = "red"
             playAgain(score,rand,alreadyPlayed)
         }
     }
 }



 function PlaySound() {
     var sound = document.getElementById("audio");
     sound.play()
 }

 function playAgain(score,rand,alreadyPlayed){
     var  random = Math.floor(Math.random() * 6)
     //make sure the random generator picks a different random number
     while(alreadyPlayed.indexOf(random) !== -1){
         random = pickRandom(rand)
     }
     document.getElementById("instructions").innerHTML = "<h3>Press any key to play the best game ever.... AGAIN</h3>"
     document.onkeyup = function(evt) {
         if(evt.key){
             arrBlank = generateblankLetters(random)
             winArray = generateWinningArray(random)
             startGame(random , winArray,arrBlank, score)
         }
     }
 }
 function userInputLetters(arr,key){
     for( var i = 0; i <arr.length ; i++){
         if( arr[i] == key){
             arr.pop()
             document.getElementById("already-guessed").innerHTML= key + " has been guessed already try again"
         }else{
             document.getElementById("already-guessed").innerHTML="<h3>YOU GUESS THE FOLLOWING LETTERS</h3><h4>"+arr+"</h4>"
         }
     }
 }
 /**
  *
  * @param str - string
  * @param char - character to be replaced
  * @returns {*} - return final string
  */

 function replaceAll(str,char){
     while(str.indexOf(char) != -1 ){
         str = str.replace(char, "")
     }
     return str
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
     document.getElementById("guess-letter").innerHTML="<h1>"+blank+"</h1>"
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
 function pickRandom(rand){
     var ret=Math.floor(Math.random() * 6)
     while(rand === Math.floor(Math.random() * 6) ){
         ret =Math.floor(Math.random() * 6)
     }
     return ret

 }


 function initGame(){
     var rand = Math.floor(Math.random() * 6)
     var score=0
     document.getElementById("instructions").innerHTML = "<h3>Press any key to Play the best game ever</h3>"
     document.onkeyup = function(evt) {
         if(evt.key){
             arrBlank = generateblankLetters(rand)
             winArray = generateWinningArray(rand)
             startGame(rand , winArray,arrBlank, score)
         }
     }
 }




