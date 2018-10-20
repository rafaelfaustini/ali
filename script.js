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

button.mousePressed(chat);
$("#falar_entrada").keyup(function(event) {
  if (event.keyCode == 13) {
    chat();
  }
});


function chat()
{

  if (Date.now() - last_clicked < 800){
    button.class('btn btn-danger btn-lg btn-xl text-uppercase disabled');
    button.class('btn btn-default btn-lg btn-xl text-uppercase');

    return;
  }
  last_clicked = Date.now();


  let input = fala.value();
  document.getElementById("falar_entrada").value = "";
  if (input == "") return;
  let x = document.createElement("div");
  let t = document.createTextNode(input);
  x.className = 'user message float-right';
  x.appendChild(t);
  document.getElementById("chat_box").appendChild(x);
  let reply = bot.reply("local-user", input);
  let x2 = document.createElement("div");
  let t2 = document.createTextNode(reply);
  x2.className ='ali message float-left';
  x2.appendChild(t2);
  document.getElementById("chat_box").appendChild(x2);
  setupVoices();

  $(document.body).css('padding-top', $('#topnavbar').height() + 20);
  $(document.body).css('padding-bottom', ( $('#footer').height()+ ($('.message:last').offset().top - $('.message:first').offset().top) ) + $('#topnavbar').height() + 35);

  voz.speak(reply);
}
}
