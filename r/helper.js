function hasClass(selector, elem) {
	if (selector.charAt(0) === '.') {
		return (" ." + elem.className + " ").indexOf(" " + selector + " ") > -1;
	} else {
		return false;
	}
}

function isTag(selector, elem) {
	if (elem.tagName.toUpperCase() === selector.toUpperCase()) {
		return true;
	} else {
		return false;
	}
}

function recursiveSelect(selector, collect, elem) {
	if (elem != null) {
		if (hasClass(selector, elem)) {
			collect.push(elem);
		} else if (isTag(selector, elem)) {
			collect.push(elem);
		}

		var children = elem.children;
		for (var i = 0; i < children.length; i++) {
			recursiveSelect(selector, collect, children[i]);
		}
	}
	return collect;
}

function select(selector, elem) {
	var objects = [];

	if (selector.charAt(0) === '#') {
		return document.getElementById(selector.substring(1, selector.length));
	} else {
		return recursiveSelect(selector, objects, (elem ? elem : document.body));
	}
}

function figCaption(dom) {
	if (dom && dom.innerText) {

		var img = select("img", dom);
		var i = 0;
		var html = "";
		for (i = 0; i < img.length; i++) {
			html = html + img[i].outerHTML;
			img[i].parentNode.removeChild(img[i]);
		}
		dom.innerHTML = html + "<figcaption>" + dom.innerHTML + "</figcaption>";
	}
}


(function format() {

	window.onscroll = function() {
		if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
			document.getElementById("up").style.display = "inline";
		}
	}

	var i = 0;
	var s = select(".left");
	for (i = 0; i < s.length; i++) {
		figCaption(s[i]);
	}
	s = select(".right");
	for (i = 0; i < s.length; i++) {
		figCaption(s[i]);
	}
	s = select(".full");
	for (i = 0; i < s.length; i++) {
		figCaption(s[i]);
	}

})();
