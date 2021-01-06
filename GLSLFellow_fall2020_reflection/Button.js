function Button(id, img, x, y, w){
  this.id = id;

  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;

  this.display = function(){
    image(this.img, this.x, this.y, this.w, this.w);
  }

  this.hovered = function(bool){
    if(bool){
      this.w = 65;
    } else {
      this.w = 60;
    }
  }

  this.pressed = function(){
    this.w = 50;

    // open new web pages
    switch(this.id){
      case "L":
        mode = modes.PAST;
        break;

      case "R":
        mode = modes.FUTURE;
        break;

      case "M":
        break;

      case "B":
      console.log("back to index");
        mode = modes.INDEX;
        break;
    }

  }


  this.reposition = function() {
    switch(this.id){
      case "L":
        this.x = width/2-bd;
        this.y = height*2/3;
        break;

      case "R":
        this.x = width/2+bd;
        this.y = height*2/3;
        break;

      case "M":
        this.x = width/2;
        this.y = height*2/3;
        break;

      case "B":
        this.x = width*0.9;
        this.y = height*0.9;
        break;
    }
  }

}
