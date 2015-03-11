function banner() {
	height = $(window).height();
	width = $(window).width();
	headerHeight = $(".site-header").height();
	newHeight = height - headerHeight;

	$(".full").css("height", newHeight).css( "background-size", "cover" ).backstretch("resize");
	
}


function wide(cssClass) {
		width = $(window).width();
		wrapperWidth = $(".wrapper").width();
		$(cssClass).css("width", width);
		$(cssClass).css("min-width", width);
		$(cssClass).css("margin-left", -((width - wrapperWidth)/2));
}


function wider() {
	wide(".wide");	
}

function navigation() {
	scrollTop = $(document).scrollTop();
	height = $(window).height();
	 	
	if (scrollTop > height) {
		$('#goTop').show(250);
	} else {
		$('#goTop').hide(250);
	}
}

$(function() {
	function scrollTop() {
		$('html, body').animate({scrollTop:0}, 1000);
	}
	
	$('#goTop').click(function() {scrollTop(); return false;});
});


$(window).on("orientationchange", function(event) { banner(); wider(); navigation();});
$(window).on("load", function(event) { banner(); wider(); navigation(); });
$(window).resize(function(e) {
	window.resizeEvt;
   $(window).resize(function()
   {
       clearTimeout(window.resizeEvt);
       window.resizeEvt = setTimeout(function() { banner(); wider();
       }, 250);
   });
});
$(document).scroll(function() {navigation();});
