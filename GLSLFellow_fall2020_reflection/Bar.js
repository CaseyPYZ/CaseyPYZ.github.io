function Bar(name, initValue){
  this.name = name;
  //this.color = color;

  this.h = 10;
  this.v = initValue;

  //this.x = posX+windowWidth*0.1;

  switch(this.name){
    case 'politics':
      this.color = 20;
      this.x = posX + windowWidth*0.14;
      this.y = windowHeight*0.75;
      break;
    case 'economy':
      this.color = 60;
      this.x = posX + windowWidth*0.14;
      this.y = windowHeight*0.78;
      break;
    case 'culture':
      this.color = 40;
      this.x = posX + windowWidth*0.14;
      this.y = windowHeight*0.81;
      break;
    default:
  }



  this.updateV = function(newv){
    if(newv > this.v){
      while(newv > this.v){
        this.v=this.v+0.01;
      }
    } else if (newv < this.v){
      while(newv<this.v){
        this.v=this.v-0.01;
      }
    }
  }


  this.display = function(){

    textSize(20);
    textAlign(LEFT,CENTER);
    text(this.name, this.x-100, this.y+3);

    switch(this.color){
      case 20:
        fill(20);
      case 40:
        fill(40);
      case 60:
        fill(60);
    }

    rectMode(CORNER);
    rect(this.x, this.y, this.v, this.h);

  }


  this.reposition = function(){
    switch(this.name){
      case 'politics':
        this.x = posX + windowWidth*0.14;
        this.y = windowHeight*0.75;
        break;
      case 'economy':
        this.x = posX + windowWidth*0.14;
        this.y = windowHeight*0.78;
        break;
      case 'culture':
        this.x = posX + windowWidth*0.14;
        this.y = windowHeight*0.81;
        break;
      default:
    }
  }


}
