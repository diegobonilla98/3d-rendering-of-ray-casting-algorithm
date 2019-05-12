class Particle
{
	constructor()
	{
		this.pos=createVector(width/20, height/2);
		this.rays=[];
		this.FOV=45;
		this.heading=0;
		this.sens=0.3;
		for(var i=-this.FOV/2; i<this.FOV/2; i+=this.sens)
		{
			this.rays.push(new Ray(this.pos, radians(i)));
		}
	}
	moveTo(x, y)
	{
		this.pos.x+=movVel*x;
		this.pos.y+=movVel*y;
	}
	rotateHead(angle)
	{
		this.heading+=angle;
		var a=-this.FOV/2;
		for(var i=0; i<this.rays.length; i+=1)
		{
			a+=this.sens;
			this.rays[i].setAngle(radians(a)+this.heading);
		}
	}
	update(x, y)
	{
		this.pos.set(x, y);
	}
	look(walls)
	{
		const scene=[];
		var i=0;
		for(var ray of this.rays)
		{
			var closest=null;
			var record=Infinity;
			for(var wall of walls)
			{
				const pt=ray.cast(wall);
				if(pt)
				{
					var d=p5.Vector.dist(this.pos, pt);
					const a=ray.dir.heading()-this.heading;
					d*=cos(a);
					if(d<record)
					{
						record=d;
						closest=pt;
					}
				}	
			}
			if(closest)
			{
				stroke(255, 50);
				strokeWeight(6);
				line(this.pos.x, this.pos.y, closest.x, closest.y);
			}
			scene[i]=record;
			i++;
		}
		return scene;
	}
	show()
	{
		fill(255);
		ellipse(this.pos.x, this.pos.y, 16, 16);
		for(var ray of this.rays)
		{
			ray.show();
		}
	}
}