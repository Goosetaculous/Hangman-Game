
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

 var ratm={
     name   : "Rage against the machine",
     video  : "https://www.youtube.com/watch?v=bWXazVhlyxQ&list=PL2EbESdPFdo5Xwx2SHw0_SsayQzOqZaNZ",
     hints  : [" Political band ", " Killing in the name of "," Tom Morello "," Zack Dela Roca "]
 }

 var bands =[
     ratm, godsmack, korn
 ]


 /*******
  *
  * @param rand -  random pic band to be guessed
  * @param arrAnswer - array of blanks with the length of the band name
  *
  *******/
 function startGame(rand, arrAnswer){
     var triesCtr=10
     var alphaExp=/^[0-9a-zA-Z]+$/;
     var guessedLetter = document.getElementById("guess-letter").innerHTML
     var arrUserGuess=[]
     var score=0
     alert(guessedLetter)

     document.getElementById("hints").innerHTML= "<h3>HINTS</h3> "+ bands[rand].hints
     document.getElementById("instructions").innerHTML = ""
     document.onkeyup=function(evt){
         if(evt.key && checkLetter( arrAnswer , evt.key)  ){

             arrUserGuess.push( evt.key ) //create an array guessed letters


             //get the character
             //find the index(es) of where it exist
             console.log( findArrayIndexs(evt.key, arrAnswer) )
             //replace the guessed

             







         }else if( evt.key.length == 1 && evt.key.length != " " && alphaExp.test(evt.key)   ) {
             triesCtr--
             document.getElementById("tries").innerHTML=triesCtr + "tries left"
         }
         if(triesCtr == 0){
             document.getElementById("tries").innerHTML=""
             document.getElementById("game-result").innerHTML=lost.video
         }
     }
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
     var arrBandName=[]
     var blank=""
     var letters=document.createElement("div")
         letters.setAttribute("id","hint-letters")
     for(var i=0; i<bandName.length;i++){
         blank= blank +"_ "
         arrBandName.push(bandName[i])
     }
     document.getElementById("guess-letter").innerHTML=blank
     return arrBandName
 }

 function initGame(){
     var rand = Math.floor(Math.random() * 3)
     document.getElementById("instructions").innerHTML = "<h1>Press any key to Play the best game ever</h1>"
     document.onkeyup = function(evt) {
         if(evt.key){
             arrAnswer = generateblankLetters(rand)  //return
             startGame(rand , arrAnswer)
         }
     }
 }




