function Snowbuddy(world){
  this.world = world;

  this.yPos = 0;
  // create & add a container for this Snowbuddy
  this.container = new Container3D({
    x:random(-40,40), y:0, z:random(-40,40)
  });

  this.world.add(this.container);

  // bottom & top sphere
  this.bottomS = new Sphere({
    x:0, y:this.yPos, z:0,
    radius:0.5,
    red:255, green:255, blue:255,
    clickFunction: function( theSphere )
    {
      theSphere.nudge(0,0.5,0);
    }
  });

  this.topS = new Sphere({
    x:0, y:this.yPos+0.7, z:0,
    radius:0.3,
    red:255, green:255, blue:255
    ,clickFunction: function( theSphere )
    {
      theSphere.nudge(0,0.5,0);
    }
  });

  this.container.addChild(this.bottomS);
  this.container.addChild(this.topS);


  // params for Perlin movement
  this.xSpeed = 0;
  this.ySpeed = 0;

  this.nDetail = random(10,30);

  this.noiseIdx_x = random(10);
  this.noiseIdx_y = random(20,30);


  // move the Snowbuddy around a little
  // Perlin noise movement
  this.move = function(){

    noiseDetail(this.nDetail);

    var xn = noise(this.noiseIdx_x);
    var zn = noise(this.noiseIdx_y);

    this.xSpeed = map(xn, 0, 1, -0.05, 0.05);
    this.zSpeed = map(zn, 0, 1, -0.05, 0.05);

    this.container.nudge(this.xSpeed,0,this.zSpeed);

    // wrap around
    if(this.container.x<=-50 || this.container.x>=50){
      this.container.x*=-1;
    }
    if(this.container.z<=-50 || this.container.z>=50){
      this.container.z*=-1;
    }

    this.noiseIdx_x+=0.01;
    this.noiseIdx_y+=0.01;

  }

  // this method makes sure the Snowbuddy's head and body stays together
  this.refreshY = function(){
    if(this.bottomS.getY() > this.topS.getY()){
      //console.log('heyyy');
      this.yPos = this.bottomS.getY();
      this.topS.setY(this.yPos+0.7);
    } else {
      this.yPos = this.topS.getY()-0.7;
      this.bottomS.setY(this.yPos);
    }
  }

}
