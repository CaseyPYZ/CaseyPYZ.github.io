var cnv;

var bRimg, bLimg, bMimg;
var xR, yR, xL, yL, xM, yM;
var buttonR, buttonL, buttonM;
var buttons;

var bw = 60; // button img width
var bd = 200; // distance between button

var titleFont, txtFont;

var axisW, axisH;

var posX;
var pos;
var knotNum = 9;
var kgap;

var years = ["1860", "1910", "1916", "1930", "1960", "1970", "1975", "1977", "now"];
var txts = ["1860, after the Second Opium War, Tsim Sha Tsui was handed over to Britian under the Convention of Qing Empire, following the handover of Hong Kong Island in 1842 after the First Opium War.\n\nColonial government saw the potential for TST to become a major commercial port as it is near the Hong Kong Island, strategically located with deep water that would allow large clipper ships to drop anchor.",
            "Began the construction of the Kowloon–Canton Railway with its terminus in Tsim Sha Tsui.\n\nOctober 1, 1910, The Kowloon Canton Railway opened.",
            "Terminus stations is officially open.\n\nShows a steam engine, signal box, wooden level crossing gates, iron spear fencing and the station clock tower",
            "- 1930 -",
            "Became the world’s busiest shipping port from where domestic goods such as dried seafood were exported around the world and through which foreign goods such as heavy machinery and industrial products were imported.",
            "- 1970 -",
            "Tsim Sha Tsui terminus of the Kowloon-Canton Railway relocates to Hung Hom, leaving behind only the clock tower.",
            "Demolition was completed and succeeded in preserving the Clock Tower",
            "Major tourism, shopping and dining hub. Now is replaced with the Hong Kong Space Museum, Hong Kong Museum of Art and Hong Kong Cultural Center."];
var kimgps = ["img/photos/1860.png", "img/photos/1910.png", "img/photos/1916.png", "img/photos/1930.png",
              "img/photos/1960.png", "img/photos/1970.png", "img/photos/1975.png", "img/photos/1977.png",
              "img/photos/now.png"];
var kImgs = [];

var knots = [];
var kIdx;

var initPos;

// image
var imgX, imgY;
var imgW, imgH;

var txtX, txtY;
var txtW, txtH;

var barNames = ['politics', 'economy', 'culture'];
var bars = [];
var pVs = [80,83,70,50,40,30,20,13,10];
var eVs = [75,77,80,85,88,83,80,75,70];
var cVs = [10,12,10,13,30,35,40,50,75];

var xB, yB;
var buttonBack;

var bgmOld;
var bgmNew;

var intro;

var mode;


const modes = {
  INDEX: 'index',
  PAST: 'past',
  FUTURE: 'future'
}

function preload(){
  bRimg = loadImage("img/icons/right.png");
  bLimg = loadImage("img/icons/left.png");
  bMimg = loadImage("img/icons/menu.png");

  titleFont = loadFont("asset/cut_the_paper.ttf");
  txtFont = loadFont("asset/PlantagenetCherokee.ttf");

  for(var i=0; i<knotNum; i++){
    var kimg = loadImage(kimgps[i]);
    kImgs.push(kimg);
  }

  bgmOld = loadSound("aud/ferry-boat.mp3");

}



function setup(){
  cnv = createCanvas(windowWidth,windowHeight);
  cnv.parent('cnvDiv');

  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  // button coordinates
  xL = width/2-bd; yL = height*2/3;
  xR = width/2+bd; yR = height*2/3;
  xM = width/2; yM = height*2/3;

  // buttons
  buttonL = new Button("L", bLimg, xL, yL, bw);
  buttonR = new Button("R", bRimg, xR, yR, bw);
  buttonM = new Button("M", bMimg, xM, yM, bw);

  buttons = [buttonL, buttonM, buttonR];

  xB = width*0.93; yB = height*0.9;
  buttonBack = new Button("B", bRimg, xB, yB, bw);

  // initial mode
  mode = modes.INDEX;

  // timeline & knots
  kgap = windowHeight+60;

  posX = windowWidth/4+30;
  pos = kgap*4+300;

  initPos = kgap*4+300;

  axisW = 5;
  axisH = kgap*8+kgap/6;

  // Knots
  for(var i=0; i<knotNum; i++){
    var k = new Knot(i, posX, pos+kgap*(i-4), kImgs[i], years[i], txts[i]);
    knots.push(k);
  }

  kIdx = 0;

  // coordinate & sizes
  imgW = windowWidth*0.46;
  imgH = imgW*0.68;
  imgX = posX+imgW*5/8;
  imgY = windowHeight/3+30;

  txtW = max(120,windowWidth*0.18);
  txtH = max(150,txtW*1.5);
  txtX = posX-txtW*0.8;
  txtY = windowHeight*0.7;

  for(var i=0; i<barNames.length; i++){
    var b = new Bar(barNames[i], 50);
    console.log(b.name, b.initValue);
    bars.push(b);
  }

  bgmOld.playMode('untilDone');
  bgmOld.setVolume(0.9);

  intro = false

  background(200);
}



function draw(){

  background(200);

  switch (mode) {

    // INDEX MODE ---------------------------------------------------------------------------------------------------*
    case modes.INDEX:
      // show index page

      // display buttons
      for(var i=0; i<buttons.length; i++){

        buttons[i].display();

        if( mouseX>buttons[i].x-bw/2 && mouseX<buttons[i].x+bw/2 && mouseY>buttons[i].y-bw/2 && mouseY<buttons[i].y+bw/2){
          buttons[i].hovered(true);
        } else {
          buttons[i].hovered(false);
        }
      }

      textAlign(CENTER, CENTER);
      textFont(titleFont);
      fill(0);
      textSize(55);
      text("The Little Things About", width/2, height/3-70);
      textSize(100);
      text("Tsim Sha Tsui", width/2, height/3);
      textSize(97);
      text("Clock Tower", width/2, height/3+80);

      break;

    // PAST MODE ----------------------------------------------------------------------------------------------------*
    case modes.PAST:
      textFont(titleFont);
      fill(0);
      textSize(90);
      textAlign(CENTER,CENTER);
      text("The", width/7+23, height/3-190);
      text("Past", width/7, height/3-120);

      rectMode(CENTER);
      noStroke();
      fill(30);
      rect(posX,pos,axisW,axisH);

      for(var i=0; i<knotNum; i++){
        knots[i].updatePos();
        knots[i].display();
      }

      updateKIdx();

      image(kImgs[kIdx], imgX, imgY, imgW, imgH);
      textAlign(LEFT,CENTER);
      textSize(15);
      fill(30);
      text(txts[kIdx], txtX, txtY, txtW, txtH);

      // display Bars
      for(var j=0; j<bars.length; j++){
        bars[j].display();
      }

      buttonBack.display();


      break;

    //--------------------------------------------------------------------------------------------------------------*
    case modes.FUTURE:
      textFont(titleFont);
      fill(0);
      textSize(100);
      text("The Future", width/2, height/3-70);

      break;

    default:

    }

}



function introToggle(){
  intro
}




function updateKIdx(){

  for(var x=0; x<knotNum; x++){
    if( knots[x].y > 0 && knots[x].y <= windowHeight){
      kIdx = x;
    }
  }

  bars[0].updateV( map(pVs[kIdx],0,100,0,300) );
  bars[1].updateV( map(eVs[kIdx],0,100,0,300) );
  bars[2].updateV( map(cVs[kIdx],0,100,0,300) );

  if(kIdx == 1){
    bgmOld.play();
  }

}


function mousePressed(){

  for(var i=0; i<buttons.length-1; i++){
    if( mouseX>buttons[i].x-bw/2 && mouseX<buttons[i].x+bw/2 && mouseY>buttons[i].y-bw/2 && mouseY<buttons[i].y+bw/2){
      buttons[i].pressed();
    }
  }

  if( mouseX>buttonBack.x-bw/2 && mouseX<buttonBack.x+bw/2 && mouseY>buttonBack.y-bw/2 && mouseY<buttonBack.y+bw/2){
    buttonBack.pressed();
  }

}



function mouseWheel(event){
  //if( pos > (-3130) && pos < 3900){
    pos -= event.deltaY;
  //}

  if(pos <= (-3130) ){
    pos = -3120;
  } else if ( pos>= 3900){
    pos = 3910;
  }

  //console.log(pos);

}




function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  kgap = windowHeight+60;

  posX = windowWidth/4+50;
  imgX = posX+imgW*5/8;
  imgY = windowHeight/3+30;

  // coordinate & sizes
  imgW = windowWidth*0.46;
  imgH = imgW*0.68;
  imgX = posX+imgW*5/8;
  imgY = windowHeight/3+30;

  txtW = max(120,windowWidth*0.18);
  txtH = max(150,txtW*1.5);
  txtX = posX-txtW*0.8;
  txtY = windowHeight*0.7;

  for(var i=0; i<buttons.length; i++){
    buttons[i].reposition();
  }

  buttonBack.reposition();

  for(var i=0; i<bars.length; i++){
    bars[i].reposition();
  }

}
