let num = 999;
var last_clicked = 0;




let voz= new p5.Speech();
function setupVoices(){
  let voices = voz.voices;
  let voice = random(voices.name);
  voz.setVoice(voice.name);
}



function setup()
{
noCanvas();
let bot = new RiveScript({utf8: true});
bot.loadFile("bot.rive", bReady,bError);

window.setInterval(function() {
  var elem = document.getElementById('data');
  elem.scrollTop = elem.scrollHeight;
}, 5000);





function bReady()
{
  console.log('Ali Iniciada');
  bot.sortReplies();
}

function bError()
{
  console.log('Erro ao iniciar Ali');
}


let button = select('#submit');
let fala = select('#falar_entrada');
let saida = select('#saida');

button.mousePressed(chat);
$("#falar_entrada").keyup(function(event) {
  if (event.keyCode == 13) {
    chat();
  }
});


function chat()
{

  if (Date.now() - last_clicked < 1000){
    button.class('btn btn-danger btn-lg btn-xl text-uppercase disabled');
    button.class('btn btn-danger btn-lg btn-xl text-uppercase');

    return;
  }
  last_clicked = Date.now();


  let input = fala.value();
  document.getElementById("falar_entrada").value = "";
  if (input == "") return;
  let x = document.createElement("LI");
  let t = document.createTextNode(input);
  x.className = 'user';
  x.appendChild(t);
  document.getElementById("chat_box").appendChild(x);
  let reply = bot.reply("local-user", input);
  saida.html(reply);

  let x2 = document.createElement("LI");
  let t2 = document.createTextNode(reply);
  x2.className ='ali';
  x2.appendChild(t2);
  document.getElementById("chat_box").appendChild(x2);
  setupVoices();
  voz.speak(reply);
}
}
