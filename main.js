x = 0;
y = 0;

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

var screen_width = 0;

var screen_height = 0;

var apple = "";

var speak_data = "";

var to_number = "";

function preload() {
  apple = loadImage("apple.png")
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

 to_number = Number(content);

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

    if(Number.isInteger(to_number)) {
      document.getElementById("status").innerHTML = "Started drawing apple";
      draw_apple = "set";
    }

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  canvas = createCanvas(screen_width, screen_height-150);
  canvas.position(150, 150);
}

function draw() {
  if(draw_apple == "set")
  {
    for (var i = 1; i <= to_number; i++)
    {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      Image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
