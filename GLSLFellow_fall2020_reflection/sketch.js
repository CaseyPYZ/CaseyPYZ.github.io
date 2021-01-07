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
var kgap;


var years = [["success","challenge","milestones"], ["1", "2", "3", "4", "5", "6", "7"]];
var txts = [["","",""],["","","","","","",""]]; // placeholders
var caps = ["The colleagues","The team","Everybody!","The students","The support","The fun","The city & the free coffee!"];

var kimgps = [
  ["img/photos/p1.jpeg", "img/photos/p2.jpeg", "img/photos/p3.jpeg"],
  ["img/photos/s1.jpeg", "img/photos/s2.jpeg", "img/photos/s3.jpeg", "img/photos/s4.jpeg",
  "img/photos/s5.jpeg", "img/photos/s6.jpeg", "img/photos/s7.jpeg"]
];
var fimgp = "img/photos/future.jpeg";
var fimg;

var kImgs = [[],[]];

var knotNum = [3,7];
var knots = [[],[]];
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
  FUTURE: 'future',
  SEVEN: 'seven'
}

function preload(){
  bRimg = loadImage("img/icons/right.png");
  bLimg = loadImage("img/icons/left.png");
  bMimg = loadImage("img/icons/seven.png");

  titleFont = loadFont("asset/cut_the_paper.ttf");
  txtFont = loadFont("asset/PlantagenetCherokee.ttf");

  for(var i=0; i<knotNum.length; i++){
    for(var j=0; j<knotNum[i]; j++){
      var kimg = loadImage(kimgps[i][j]);
      kImgs[i].push(kimg);
    }
  }
  fimg = loadImage(fimgp);

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
  initPos = kgap*4+300;

  pos = initPos;

  axisW = 4;
  axisH = kgap*8+kgap/6;

  // Knots
  for(var i=0; i<knotNum.length; i++){
    for(var j=0; j<knotNum[i]; j++){
      var k = new Knot(j, posX, pos+kgap*(j-4), kImgs[i][j], years[i][j], txts[i][j]);
      knots[i].push(k);
    }
  }

  kIdx = 0;

  // coordinate & sizes
  imgW = windowWidth*0.6;
  imgH = imgW*0.68;
  imgX = posX+imgW*5/8;
  imgY = windowHeight/3+80;

  txtW = max(120,windowWidth*0.18);
  txtH = max(150,txtW*1.5);
  txtX = posX-txtW*0.8;
  txtY = windowHeight*0.7;

  capX = imgX-(imgX/2)+30;
  capY = imgY+(imgH/2)+30;

  // for(var i=0; i<barNames.length; i++){
  //   var b = new Bar(barNames[i], 50);
  //   console.log(b.name, b.initValue);
  //   bars.push(b);
  // }

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
      textSize(85);
      text("Being a Student Life", width/2, height/3);
      textSize(97);
      text("Go Local Fellow", width/2, height/3+80);

      break;

    // PAST MODE ----------------------------------------------------------------------------------------------------*
    case modes.PAST:
      modeId = 0;

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

      for(var i=0; i<knotNum[modeId]; i++){
        knots[modeId][i].updatePos();
        knots[modeId][i].display();
      }

      updateKIdx(modeId);

      image(kImgs[modeId][kIdx], imgX, imgY, imgW, imgH);
      textAlign(LEFT,CENTER);
      textSize(15);
      fill(30);
      text(txts[kIdx], txtX, txtY, txtW, txtH);

      // display Bars
      // for(var j=0; j<bars.length; j++){
      //   bars[j].display();
      // }

      buttonBack.display();


      break;

    //--------------------------------------------------------------------------------------------------------------*
    // SEVEN MODE
    case modes.SEVEN:
      modeId = 1;

      textFont(titleFont);
      fill(0);
      textSize(90);
      textAlign(CENTER,CENTER);
      text("Seven", width/7+10, height/3-190);
      text("Little", width/7, height/3-120);
      text("Things", width/7, height/3-50);

      rectMode(CENTER);
      noStroke();
      fill(30);
      rect(posX,pos,axisW,axisH);

      for(var i=0; i<knotNum[modeId]; i++){
        knots[modeId][i].updatePos();
        knots[modeId][i].display();
      }

      updateKIdx(modeId);

      image(kImgs[modeId][kIdx], imgX, imgY, imgW, imgH);
      textAlign(LEFT,CENTER);
      textSize(15);
      fill(30);
      text(txts[kIdx], txtX, txtY, txtW, txtH);

      textSize(25);
      // for(var i=0; i<caps.length; i++){
      //   text(caps[i], capX, capY);
      // }

      text(caps[kIdx], capX, capY);

      // display Bars
      // for(var j=0; j<bars.length; j++){
      //   bars[j].display();
      // }

      buttonBack.display();
      break;

    case modes.FUTURE:
      textFont(titleFont);
      fill(0);
      textSize(100);
      text("The Future", width/2, height/3-70);
      image(fimg,windowWidth/2, windowHeight/2+50, (windowWidth+300)/4,(windowWidth+300)/6);
      
    break;


    default:

    }

}



// function introToggle(){
//   intro
// }




function updateKIdx(modeId){

  for(var x=0; x<knotNum[modeId]; x++){
    if( knots[modeId][x].y > 0 && knots[modeId][x].y <= windowHeight){
      kIdx = x;
    }
  }

  // bars[0].updateV( map(pVs[kIdx],0,100,0,300) );
  // bars[1].updateV( map(eVs[kIdx],0,100,0,300) );
  // bars[2].updateV( map(cVs[kIdx],0,100,0,300) );

  // if(kIdx == 1){
  //   bgmOld.play();
  // }

}


function mousePressed(){

  for(var i=0; i<buttons.length; i++){
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
  //imgH = imgW*0.68;
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

  // for(var i=0; i<bars.length; i++){
  //   bars[i].reposition();
  // }

}
