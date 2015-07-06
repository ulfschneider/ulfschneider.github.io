function getStyle(elem, style) {
 
  var value = elem.style[toCamelCase(style)];
 
  if(!value) {
		if(document.defaultView) {
      value = document.defaultView.getComputedStyle(elem, "").getPropertyValue(style);
		} else if(elem.currentStyle) {
      value = elem.currentStyle[toCamelCase(style)];
		}
	}
	
  return value;
}

function toCamelCase( value ) {
  var oStringList = value.split('-');
  if(oStringList.length == 1)  {
    return oStringList[0];
	}
	
  var ret = value.indexOf("-") == 0 ? oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1) : oStringList[0];
  for(var i = 1, len = oStringList.length; i < len; i++){
    var s = oStringList[i];
    ret += s.charAt(0).toUpperCase() + s.substring(1)
  }
  return ret;
}

function hasClass(elem, selector) {
	if (selector.charAt(0) === '.') {
		return (" ." + elem.className + " ").indexOf(" " + selector + " ") > -1;
	} else {
		return false;
	}
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
	
	if (selector.charAt(0) === '#') {
		return document.getElementById(selector.substring(1, selector.length));
	} else {
		return recursiveSelect(document.body, selector, objects);
	}
}

function getWindowWidth() {
	return window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function getWrapperWidth() {
	var wrappers = select(".wrapper");
	if (wrappers.length > 0) {
		return wrappers[0].offsetWidth;
	}
	return getWindowWidth();
}

function getWrapperHorizPadding() {
	var wrappers = select(".wrapper");
	if (wrappers.length > 0) {
		return parseInt(getStyle(wrappers[0], "padding-left")) * 2;
	}
	return 0;

}

function getMargin() {
	var limit = -100;
	var palm = 600; /* must be same like in main.css on-palm */
	var winWidth = getWindowWidth();
	var wrapWidth = getWrapperWidth();
	
	if (wrapWidth <= palm) {
		return -15;
	} else {
		return Math.round(Math.max(-(winWidth - wrapWidth) / 2, limit));	
	}
}

function layoutLeft() {

	var l = select(".left");
	var margin = getMargin();

	for(var i=0; i<l.length; i++) {
		var elem = l[i];
		if (margin <= 0) {
			elem.style.marginLeft = "" + margin + "px";						
		} 
	}
}

function layoutRight() {
	var l = select(".right");
	var margin = getMargin();
		
	for(var i=0; i<l.length; i++) {
		var elem = l[i];
		if (margin <= 0) {
			elem.style.marginRight = "" + margin + "px";			
		} 
	}
}

function layoutDouble() {

	var l = select(".double");
	var margin = getMargin();
	
	for(var i=0; i<l.length; i++) {
		var elem = l[i];

		if (margin <= 0) {
			elem.style.marginLeft = "" + margin + "px";		
			elem.style.marginRight = "" + margin + "px";		
		} 
	}
}

function layoutWide() {

	var palm = 600; /* must be same like in main.css form on-palm */
	var wrapWidth = getWrapperWidth();

	var margin = 0;
	
	if (wrapWidth <= palm) {
		margin = 0;
	} else {
		var winWidth = getWindowWidth();		
		var wrapPadding = getWrapperHorizPadding();
		margin = Math.round(-(winWidth + wrapPadding - wrapWidth) / 2);	
	}
	
	var l = select(".wide");
	
	for(var i=0; i<l.length; i++) {
		var elem = l[i];
		if (margin <= 0) {
			elem.style.marginLeft = "" + margin + "px";		
			elem.style.marginRight = "" + margin + "px";		
		} 
	}
}


referenceWidth = 0;

function layoutStuff() {
	var width = getWindowWidth();
	
	if (referenceWidth != width) { 
		referenceWidth = width;
		layoutLeft();
		layoutRight();
		layoutDouble();
		layoutWide();
	}
}


setInterval(function() {layoutStuff()}, 100);




