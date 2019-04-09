function Knot(id, x, y, img, year, txt){
  this.id = id;

  this.x = x;
  this.y = y;

  // radius
  this.r = 15;

  this.img = img;

  this.year = year;
  this.txt = txt;

  this.updatePos = function(){
    this.x = posX;
    this.y = pos+kgap*(id-4);
  }

  this.display = function (){

    noStroke();
    fill(30);
    ellipse(this.x, this.y, this.r, this.r);

    textFont(txtFont);
    textSize(20);
    text(this.year, this.x-50, this.y);

  }














}
