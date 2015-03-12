function banner() {
	$('.full').css('height', bannerHeight());
	$('.banner').backstretch('resize');
}

function bannerHeight() {
	var height = $(window).height();
	var headerHeight = $('.site-header').height();
	return  height - headerHeight;
}


function wide(cssClass) {
		var width = $(window).width();
		var wrapperWidth = $('.wrapper').width();
		$(cssClass).css('width', width);
		$(cssClass).css('min-width', width);
		$(cssClass).css('margin-left', -((width - wrapperWidth)/2));
}


function wider() {
	wide('.wide');	
}


var	showTopLink = false;

function navigation() {

	var scrollTop = $(document).scrollTop();
	var height = $(window).height();
	 	
	if (scrollTop > height) {
		if (showTopLink == false) {
			$('#goTop').show(0);
			showTopLink = true;
		}
	} else {
		if (showTopLink == true) {
			$('#goTop').hide(0);
			showTopLink = false;
		}
	}
}

$(function() {
	function scrollTop() {
		$('html, body').animate({scrollTop:0}, 1000);
	}
	
	$('#goTop').click(function() {scrollTop(); return false;});
});


$(window).on('orientationchange', function(event) { banner(); wider(); navigation();});
$(window).on('load', function(event) { wider(); navigation(); });
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
