function addBox(x, y, w, h)
{
	walls.push(new Boundary(x-w/2, y-h/2, x-w/2, y+h/2));
	walls.push(new Boundary(x-w/2, y+h/2, x+w/2, y+h/2));
	walls.push(new Boundary(x+w/2, y+h/2, x+w/2, y-h/2));
	walls.push(new Boundary(x+w/2, y-h/2, x-w/2, y-h/2));
}