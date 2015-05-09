function wide(cssClass) {
		var width = $(window).width();
		var wrapperWidth = $('.wrapper').width();
		$(cssClass).css('width', width);
		$(cssClass).css('min-width', width);
		$(cssClass).css('margin-left', -((width - wrapperWidth)/2));
		$(cssClass).css('margin-right', -((width - wrapperWidth)/2));		
}


function wider() {
	wide('.wide');	
}


function navigation() {
	var doc = $(document).height();	
	var height = $(window).height();
	 
	if (document.referrer != '') {
		$('#goBack').show(0);		
	} else {
		$('#goBack').hide(0);		
	}


	
	if (doc >= 2 * height) {
		$('#goTop').show(0);
	}	else {
		$('#goTop').hide(0);
	}
	
	$('#goDown').show(0);
	
}

function sizing() {
	wider(); 
	navigation();	
}

function goBack() {
	window.history.back();
}

$(function() {
	function scrollTop() {
		$('html, body').animate({scrollTop:0}, 1000);
	}
	
	function scrollDown() {
		$('html, body').animate({scrollTop:$('#pageContent').offset().top}, 1000);
	}
	
	$('#goTop').click(function() {scrollTop(); return false;});
	
	$('#goDown').click(function() {scrollDown(); return false;});
});


$(window).on('orientationchange', function(event) { sizing();});
$(window).on('load', function(event) {  sizing(); });
$(window).resize(function(e) {
	window.resizeEvt;
   $(window).resize(function()
   {
       clearTimeout(window.resizeEvt);
       window.resizeEvt = setTimeout(function() {  sizing();
       }, 250);
   });
});

