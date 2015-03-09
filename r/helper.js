function banner() {
	height = $(window).height();
	width = $(window).width();
	headerHeight = $(".site-header").height();
	newHeight = height - headerHeight;

	$(".full").css("height", newHeight).css("width", width).css( "background-size", "cover" );
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


$(window).on("orientationchange", function(event) { banner(); wider(); });
$(window).on("load", function(event) { banner(); wider(); });
$(window).resize(function(e) {
	window.resizeEvt;
   $(window).resize(function()
   {
       clearTimeout(window.resizeEvt);
       window.resizeEvt = setTimeout(function() { banner(); wider();
       }, 250);
   });
});
