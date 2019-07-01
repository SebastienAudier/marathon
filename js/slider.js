function slideRight(anElement) {
	var slideshow;
	if($(anElement).is(".slideshow")) {
		slideshow = anElement;
	} else {
		slideshow = $(anElement).parents('.slideshow');
	}
	bullets = slideshow.find('.bullets').children();
	index = 0;
	slides = slideshow.children().find('.slide-items').children();
	for (var i=0; i<slides.length; i++) {
		if($(slides[i]).is(".current")) {
			$(slides[i]).removeClass("current");
			if(bullets.length > 0) {
				$(bullets[i]).removeClass("current");
			}
			if((i + 1) == slides.length) {
				index = 0;
			} else {
				index = i + 1;
			}
		}
	}
	$(slides[index]).addClass("current");
	if(bullets.length > 0) {
		bullets.removeClass("current");
		$(bullets[index]).addClass("current");
	}
	for (var i=0; i<slides.length; i++) {
		if(index == i) {
			slideshow.children().find('.slide-items').css('margin-left', (i * -100) + "%");
		}
	}
}

function slideLeft(anElement) {
	slideshow = $(anElement).parents('.slideshow');
	bullets = slideshow.find('.bullets').children();
	slides = slideshow.children().find('.slide-items').children();
	index = 0;
	for (var i=0; i<slides.length; i++) {
		if($(slides[i]).hasClass(".current")) {
			$(slides[i]).removeClass("current");
			if(bullets.length > 0) {
				$(bullets[i]).removeClass("current");
			}
			if(i == 0) {
				index = slides.length - 1;
			} else {
				index = i - 1;
			}
		}
	}
	$(slides[index]).addClass("current");
	if(bullets.length > 0) {
		bullets.removeClass("current");
		$(bullets[index]).addClass("current");
	}
	for (var i=0; i<slides.length; i++) {
		if(index == i) {
			slideshow.children().find('.slide-items').first().css('margin-left', (i * -100) + "%");
		}
	}
}
		
function slideFromBullet(anElement) {
	var index;
	slideshow = $(anElement).parents('.slideshow');
	slider = slideshow.children().find('.slide-items').first();
	var bullets = $(anElement).parents('.bullets').children();
	var items = slider.children();
	for(var i=0; i<bullets.length; i++) {
		if($(bullets[i]).is($(anElement))) {
			index = i;
		}
		$(bullets[i]).removeClass("current");
		$(items[i]).removeClass("current");
	}
	$(anElement).addClass("current");
	$(items[index]).addClass("current");
	
	for (var i=0; i<bullets.length; i++) {
		if(index == i) {
			slider.css('margin-left', (i * -100) + "%");
		}
	}
}
		
function slide (aSlideshow, aTime) {
	aSlideshow.children().find('.slide-item').first().addClass("current");
	left = aSlideshow.find('.slide-left');
	if(left) {
		left.append('<span onclick="slideLeft(this)"><</span>');
		span = left.children().first();
		height = (aSlideshow.height() / 2) - (span.height() / 2);
		if(aSlideshow.hasClass("internal")) {
			span.css("margin-top", (height - aSlideshow.height()) + "px");	
		} else {
			span.css("margin-top", height + "px");	
		}
	}
	right = aSlideshow.find('.slide-right');
	if(right) {
		right.append('<span onclick="slideRight(this)">></span>');
		span = right.children().first();
		height = (aSlideshow.height() / 2) - (span.height() / 2);
		if(aSlideshow.hasClass("internal")) {
			span.css("margin-top", (height - aSlideshow.height()) + "px");	
		} else {
			span.css("margin-top", height + "px");	
		}
	}
	slider = aSlideshow.children('.slide-container').children().first();
	bullets = aSlideshow.find('.bullets');
	items = jQuery(slider.children());
	items.css("height", (aSlideshow.height() - bullets.height()) + "px");
	slider.css('width', (items.length) * 100 + '%');
	for(var i=0; i<items.length; i++){
		$(items[i]).css('width', (100 / items.length) + '%');
	}
	var width = 0;
	if(bullets.length > 0) {
		for(var i=0; i<items.length; i++){
			$(items[i]).css('width', (100 / items.length) + '%');
			cssClass = "bullet";
			if(i==0) {
				cssClass = cssClass + " current";
			}
			bullets.append('<div class="' + cssClass + '" onclick="slideFromBullet(this)"></div>');
			width = width + $(".bullet").width() + new Number($(".bullet").css("margin-right").split("px")[0]) + 2;
		}
		paddingLeft = ((100 - ((width * 100) / bullets.width())) / 2);
		bullets.css("padding-left", paddingLeft + "%");
		bullets.css("width", (100 - paddingLeft) + "%");
	}
	console.log((aSlideshow.height() - bullets.height()));
	slider.css("height", (aSlideshow.height() - bullets.height()) + "px");
	slider.css("transition", "all " + (aTime / items.length) + "ms ease-out");		
	slideAuto(aSlideshow, aTime);
	
}

function slideAuto(aSlideshow, aTime) {
	if(aTime > 10) {
		setTimeout(function() {
			if(!aSlideshow.is(":hover")) {
				slideRight(aSlideshow)
			} 
			slideAuto(aSlideshow, aTime); 
		}, aTime);
	}
}


