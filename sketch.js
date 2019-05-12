var walls=[];
var ray;
var part;

var movVel=2;
var right=false;
var left=false;
var up=false;
var down=false;
var turnR=false;
var turnL=false;

function setup() 
{
	createCanvas(1120,560);
	colorMode(HSB, 100);

	walls.push(new Boundary(0, 0, 0, height));
	walls.push(new Boundary(0, 0, width/2, 0));
	walls.push(new Boundary(0, height, width/2, height));
	walls.push(new Boundary(width/2, 0, width/2, height));

	var map=[1,0,0,0,0,0,0,0,0,0,
			 0,0,0,1,0,0,0,0,0,0,
			 0,0,0,1,1,1,1,1,0,0,
			 0,0,0,0,1,0,0,1,0,0,
			 0,0,0,0,1,0,0,1,0,0,
			 0,0,0,0,1,0,0,1,0,0,
			 0,0,0,0,0,0,0,1,0,0,
			 0,0,1,1,1,1,1,1,0,0,
			 0,0,0,0,0,0,0,1,0,0,
			 0,1,0,0,0,0,0,0,0,0];

	var tam=width/2/10;
	for(var i=0; i<10; i++)
	{
		for(var j=0; j<10; j++)
		{
			var loc=i+10*j;
			if(map[loc]==1)
			{
				addBox(i*tam+tam/2, j*tam+tam/2, tam, tam);
			}
		}
	}

	part=new Particle();
}
function addBox(x, y, w, h)
{
	walls.push(new Boundary(x-w/2, y-h/2, x-w/2, y+h/2));
	walls.push(new Boundary(x-w/2, y+h/2, x+w/2, y+h/2));
	walls.push(new Boundary(x+w/2, y+h/2, x+w/2, y-h/2));
	walls.push(new Boundary(x+w/2, y-h/2, x-w/2, y-h/2));
}
function draw() 
{
	background(0);

	for(var wall of walls)
	{
		wall.show();
	}
	part.show();
	const scene=part.look(walls);
	//part.update(mouseX, mouseY);

	push();
	noStroke();
	translate(width/2, height/2);
	const w=width/2/scene.length;
	for(var i=0; i<scene.length; i++)
	{
		const sq=scene[i]*scene[i];
		const wSq=(width/2)*(width/2);

		var b=map(sq, 0, wSq, 100, 0);
		//var b=map(scene[i], 0, width/2, 255, 0);
		var d=map(scene[i], 0, width/2, height, 30);

		rectMode(CORNER);
		fill(40, 20, 70);
		rect(i*w, -height/2, w+1, height/2);

		fill(10, 20, 20);
		rect(i*w, 0, w+1, height/2);

		rectMode(CENTER);
		fill(10, 70, b);
		rect(i*w, 0, w+1, d);
	}
	pop();

	if(right)part.moveTo(1,0);
	if(left)part.moveTo(-1,0);
	if(up)part.moveTo(0,-1);
	if(down)part.moveTo(0,1);
	if(turnR)part.rotateHead(0.03);
	if(turnL)part.rotateHead(-0.03);
}
function keyPressed()
{
	if(key=='w')
	{
		up=true;
	}
	if(key=='s')
	{
		down=true;
	}
	if(key=='a')
	{
		left=true;
	}
	if(key=='d')
	{
		right=true;
	}
	if(keyCode==RIGHT_ARROW)
	{
		turnR=true;
	}
	if(keyCode==LEFT_ARROW)
	{
		turnL=true;
	}
}
function keyReleased()
{
	if(key=='w')
	{
		up=false;
	}
	if(key=='s')
	{
		down=false;
	}
	if(key=='a')
	{
		left=false;
	}
	if(key=='d')
	{
		right=false;
	}
	if(keyCode==RIGHT_ARROW)
	{
		turnR=false;
	}
	if(keyCode==LEFT_ARROW)
	{
		turnL=false;
	}
}