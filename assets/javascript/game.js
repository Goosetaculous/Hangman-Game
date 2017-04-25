
 var msg={
    status  : "win",
    win     : "You guessed it right",
    lost    : "You guessed it wrong"
 }
 var lost = {
    video   : '<iframe width="400" height="200" src="http://www.youtube.com/embed/di14EZRpMVo?autoplay=1" frameborder="0" allowfullscreen></iframe>'
 }

 var korn ={
     name   : "Korn",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/SGK00Q7xx-s?autoplay=1" frameborder="0" allowfullscreen></iframe>',

     hints  : ["Got a life?","Started in San Bernandino","Jonathan Davis","4 letter band"]
 }

 var godsmack ={
     name   : "Godsmack",
     video  : '<iframe width="400" height="200" src="http://www.youtube.com/embed/opU1urLhw50?autoplay=1" frameborder="0" allowfullscreen></iframe>',

     hints  : ["Vodoo","smack","God","Navy theme song"]
 }

 var ratm={
     name   : "Rage against the machine",
     video  : "https://www.youtube.com/watch?v=bWXazVhlyxQ&list=PL2EbESdPFdo5Xwx2SHw0_SsayQzOqZaNZ",
     hints  : ["Political band", "Killing in the name of"," Tom Morello","Zack Dela Roca"]
 }

 var bands =[
     ratm, godsmack, korn
 ]


 function startGame(rand){
     document.getElementById("hints").innerHTML= bands[rand].name
     document.getElementById("instructions").innerHTML = "<h1>Lets play</h1>"
 }

 function generateblankLetters(rand){
     console.log(rand)
     var str = bands[rand].name
     var parentdiv=document.getElementById("blank-letters")
     for(var i=0; i<str.length;i++){
         var letters=document.createElement("div")
         letters.innerHTML="_"
         parentdiv.appendChild(letters)
     }

 }

 function getuserInput(rand){
     document.onkeyup = function(evt) {
         if(evt.key){
             startGame(rand)

         }
     }

 }


 function initGame(){
     var rand = Math.floor(Math.random() * 3)
     console.log(rand)
     document.getElementById("instructions").innerHTML = "<h1>Press any key to Play the best game ever</h1>"
     getuserInput(rand)

     generateblankLetters(rand)
 }




