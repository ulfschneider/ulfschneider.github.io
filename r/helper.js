function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function windowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function documentHeight() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

function wrapperWidth() {
    var s = select(".wrapper");
    if (s.length) {
        return s[0].offsetWidth;
    } else {
        return 0;
    }
}

function hasClass(selector, elem) {
    if (selector.charAt(0) === ".") {
        selector = selector.substring(1, selector.length);
    }
    return (" " + elem.className + " ")
        .indexOf(selector + " ") > -1;
}

function addClass(cssClass, elem) {
    var classes = elem.className.split(" ");
    if (classes.indexOf(cssClass) == -1) {
        elem.className += ' ' + cssClass;
    }
}

function removeClass(cssClass, elem) {
    elem.className = elem.className.replace(new RegExp(cssClass, "g"), "");
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
    } else if (selector.charAt(0) === '<') {
        return document.getElementsByTagName(selector.substring(1, selector.length - 1));
    } else {
        return recursiveSelect(selector, objects, (elem ? elem : document.body));
    }
}

function figCaption(dom) {
    if (dom && dom.innerText) {

        var img = select("img", dom);
        var i = 0;
        var html = "";
        if (dom.innerHTML.indexOf("/figcaption") < 0) {
            for (i = 0; i < img.length; i++) {
                html = html + img[i].outerHTML;
                img[i].parentNode.removeChild(img[i]);
            }
            dom.innerHTML = html + "<figcaption>" + dom.innerHTML + "</figcaption>";
        }
    }
}

function imgVerticalMiddle(dom) {
    if (dom) {
        var img = select("img", dom);
        if (img.length) {
            var iHeight = img[0].height;
            var wrapperHeight = dom.offsetHeight;

            if (iHeight > wrapperHeight) {
                img[0].style.marginTop = -Math.floor((iHeight - wrapperHeight) / 2) + "px";
            } else {
                img[0].style.marginTop = "0px";
            }
            img[0].style.marginBottom = "0px";
        }
    }
}

function breakout() {
    var wi = windowWidth();

    if (refWidth !== wi) {
        refWidth = wi;
        var wr = wrapperWidth();
        var margin = Math.ceil((wr - wi) / 2);

        var s = select(".breakout");
        for (var i = 0; i < s.length; i++) {

            if (wi > wr) {
                //0.31 = (1.62 - 1) / 2
                s[i].style.marginLeft = Math.ceil(Math.max(margin / 2, -wr * 0.31)) + "px";
                s[i].style.marginRight = Math.ceil(Math.max(margin / 2, -wr * 0.31)) + "px";
            } else {
                s[i].style.marginLeft = "0px";
                s[i].style.marginRight = "0px";
            }
            //imgVerticalMiddle(s[i]);
        }
    }
}

function moveHeader() {
    //inspired by https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;


    var siteHeader = select("#siteHeader");
    var headerHeight = siteHeader.offsetHeight;

    siteHeader.style.transition = "top 0.2s ease-in-out";
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        // If current position > last position AND scrolled past header
        // scroll down
        siteHeader.style.top = "" + -(headerHeight + 1) + "px";
    } else {
        if (scrollTop + windowHeight() < documentHeight()) {
            siteHeader.style.top = 0;
        }
        if (scrollTop <= headerHeight) {
            removeClass("slide-in", siteHeader);
        } else {
            addClass("slide-in", siteHeader);
        }
    }
    lastScrollTop = scrollTop;
}

function up() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop > 150) {
        select("#up")
            .style.display = "inline";
    }
}



var refWidth = 0;
var scrolled = false;
var resized = false;
var lastScrollTop = 0;
var delta = 5;

(function format() {

    window.onload = function() {
        breakout();
        window.onscroll = function() {
            scrolled = true;
        }
        window.onresize = function() {
            resized = true;
        }

        setInterval(function() {
            if (scrolled) {
                scrolled = false;
                moveHeader();
                up();
                breakout();
            }
            if (resized) {
                resized = false;
                var siteHeader = select("#siteHeader");
                siteHeader.style.top = 0;
                breakout();
            }
        }, 250);
    }

    //make figcaptions
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
    s = select(".breakout");
    for (i = 0; i < s.length; i++) {
        figCaption(s[i]);
    }
})();