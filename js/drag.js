//entity
var posX, posY; // orginal pos
var flagDrag = false;
var myTarget;

//init Event for target
function init() {

	var tilemap = document.getElementsByClassName("target");
	for (var i = 0; i < tilemap.length; i++) {
		tilemap[i].addEventListener('mousedown', startDrag);

	}

}

//get position XY
function getXY(e) {
	var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	return [x, y];
}

// mouse move
function dragging(e) {
	e.preventDefault();

	if (!flagDrag) {
		return;
	}

	var pos = getXY(e);

	myTarget.style.position = 'absolute';
	var vlx = pos[0] + 1;
	var vly = pos[1] + 1;
	myTarget.style.left = vlx + 'px';
	myTarget.style.top = vly + 'px';
}

//mouse down
function startDrag(e) {

	window.mouseDown = true;
	e.preventDefault();
	myTarget = e.target;
	if (e.target.id != "newclone")
		myTarget = e.target.cloneNode(true);
	myTarget.id = "newclone";
	myTarget.addEventListener('mousedown', startDrag);
	document.body.appendChild(myTarget);

	flagDrag = true;

	myTarget.style.background = "yellow";
	myTarget.style.opacity = "0.3";
	window.addEventListener('mousemove', dragging);
	window.addEventListener('mouseup', stopDrag);
}

//mouse up
function stopDrag(e) {
	window.mouseDown = false;
	flagDrag = false;



	var des = e.target;
	var a = getXY(e);
	//var finalCheck = checkInside(a[0],a[1],"destination");

	if (!des.className.includes("destination")) {
		document.body.removeChild(myTarget);
	} else {
		myTarget.style.opacity = "1";
		myTarget.style.position = "";
		myTarget.style.background = "";
		des.appendChild(myTarget);

	}

	window.removeEventListener('mousemove', dragging);
	window.removeEventListener('mouseup', stopDrag);
}