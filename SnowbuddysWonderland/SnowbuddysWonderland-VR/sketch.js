// variable to hold a reference to our A-Frame world
var world;

// our 3D models
var building1a, building1b, building1c, building1d;

// array to hold our Snowbuddies
var SBArray = [];

// number of Snowbuddies
var SB_NUM = 20;

// audios
var bgm, footsteps;

function preload(){
	 bgm = loadSound("aud/wind.mp3");
	 footsteps = loadSound("aud/footsteps.mp3");
}

function setup() {
	// no canvas needed
	noCanvas();

	// audio playModes
	bgm.setVolume(1.5);
	bgm.playMode('untilDone');
	footsteps.playMode('untilDone');

	// construct the A-Frame world
	world = new World('VRScene');

	// create a base plane
	var basePlane = new Plane({
		x: 0, y:-0.3, z:0, width:100, height:100, asset:'snow', rotationX:-90, repeatX:100, repeatY:100, metalness:0.1
	});
	world.add(basePlane);


	// add OBJ models
	// model 1
	building1a = new OBJ({
		asset: 'building1a_obj',
		mtl:'building1a_mtl',
		x: -40,
		y: -0.3,
		z: -40,
		scaleX:0.3,
		scaleY:0.3,
		scaleZ:0.3,
	});
	world.add(building1a);

	// model 2
	building1b = new OBJ({
		asset: 'building1b_obj',
		mtl:'building1b_mtl',
		x: 40,
		y: -0.3,
		z: -40,
		scaleX:0.3,
		scaleY:0.3,
		scaleZ:0.3,
	});
	world.add(building1b);

	// model 3
	building1c = new OBJ({
		asset: 'building1c_obj',
		mtl:'building1c_mtl',
		x: 40,
		y: -0.3,
		z: 40,
		scaleX:0.3,
		scaleY:0.3,
		scaleZ:0.3,
	});
	world.add(building1c);

	// model 4
	building1d = new OBJ({
		asset: 'building1d_obj',
		mtl:'building1d_mtl',
		x: -40,
		y: -0.3,
		z: 40,
		scaleX:0.3,
		scaleY:0.3,
		scaleZ:0.3,
	});
	world.add(building1d);

	// add our Snowbuddies
	for(var i=0; i<SB_NUM; i++){
		var SB = new Snowbuddy(world);
		append(SBArray, SB);
	}

	// primitive decorations

	for(var b=0; b<12; b++){
		var box = new Box({
			x:random(-45,45), y:-0.5, z:random(-45,45),
			width:1, height: 1, depth: 1,
			rotationX:random(20,70), rotationY:random(20,70), rotationZ:random(20,70),
			red:255, green:255, blue:255
		});
		world.add(box);
	}

	for(var c=0; c<6; c++){
		var cylinder = new Cylinder({
			x:random(-45,45), y:-0.5, z:random(-45,45),
			height: random(0.5,1.2), radius:random(0.25,0.8),
			rotationX:random(20,70), rotationY:random(20,70), rotationZ:random(20,70),
			red:255, green:255, blue:255
		});
		world.add(cylinder);
	}

	for(var d=0; d<6; d++){
		var dodeca = new Dodecahedron({
			x:random(-45,45), y:-0.5, z:random(-45,45),
			radius:random(0.5,2.7),
			rotationX:random(20,70), rotationY:random(20,70), rotationZ:random(20,70),
			red:255, green:255, blue:255
		});
		world.add(dodeca);
	}

	for(var t=0; t<6; t++){
		var torus = new Torus({
			x:random(-45,45), y:-0.5, z:random(-45,45),
			radius:random(0.3,1),
			radiusTubular:random(0.02,0.2),
			rotationX:random(20,70), rotationY:random(20,70), rotationZ:random(20,70),
			red:255, green:255, blue:255
		});
		world.add(torus);
	}


}



function draw() {
	bgm.play();

	//var pos = world.getUserPosition();

	if (mouseIsPressed) {
		world.moveUserForward(0.02);
		footsteps.play();
	} else {
		footsteps.pause();
	}

	// constrain movement within basePlane
	var pos = world.getUserPosition();

	if (pos.x > 50) {
		world.setUserPosition(50, pos.y, pos.z);
	}
	else if (pos.x < -50) {
		world.setUserPosition(-50, pos.y, pos.z);
	}
	if (pos.z > 50) {
		world.setUserPosition(pos.x, pos.y, 50);
	}
	else if (pos.z < -50) {
		world.setUserPosition(pos.x, pos.y, -50);
	}

	// move all Snowbuddies
	for(var k=0; k<SBArray.length; k++){
		SBArray[k].move();
		SBArray[k].refreshY();
	}

}
