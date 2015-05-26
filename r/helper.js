function hasClass(elem, selector) {
		return (" " + elem.className + " ").indexOf(" " + selector + " ") > -1;
}

function recursiveSelect(elem, selector, collect) {

	if (elem != null) {
		if (hasClass(elem, selector)) {
			collect.push(elem);			
		}
	
		var children = elem.children;
		for(var i=0; i<children.length; i++) {
			recursiveSelect(children[i], selector, collect);
		}
	}
	return collect;
}

function select(selector) {

	var objects = [];
	return recursiveSelect(document.body, selector, objects);
}

function getWindowWidth() {
	return window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getWrapperWidth() {
	var wrappers = select("wrapper");
	if (wrappers.length > 0) {

		return wrappers[0].offsetWidth;
	}
	return getWindowWidth();
}


function getMargin() {
	var limit = -100;
	var palm = 600; /* must be same like in main.css form on-palm */
	var winWidth = getWindowWidth();
	var wrapWidth = getWrapperWidth();
	
	if (wrapWidth <= palm) {
		return - 15;
	} else {
		return   Math.round(Math.max(-(winWidth - wrapWidth) / 2, limit));	
	}
}

function layoutLeft() {

	var l = select("left");

	for(var i=0; i<l.length; i++) {
		var elem = l[i];
		var margin = getMargin();
		if (margin <= 0) {
			elem.style.marginLeft = "" + margin + "px";						
		} 
	}
}

function layoutRight() {
	var l = select("right");

	for(var i=0; i<l.length; i++) {
		var elem = l[i];
		var margin = getMargin();
		if (margin <= 0) {
			elem.style.marginRight = "" + margin + "px";			
		} 
	}
}

function layoutDouble() {

	var l = select("double");

	for(var i=0; i<l.length; i++) {
		var elem = l[i];
		var margin = getMargin();
		if (margin <= 0) {
			elem.style.marginLeft = "" + margin + "px";		
			elem.style.marginRight = "" + margin + "px";		
		} 
	}
}

function layoutStuff() {
	layoutLeft();
	layoutRight();
	layoutDouble();
}




