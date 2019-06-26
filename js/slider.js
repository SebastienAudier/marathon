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
		if($(slides[i]).is(".current")) {
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
	var bullets = $(anElement).parents('.bullets').children();
	for(var i=0; i<bullets.length; i++) {
		if($(bullets[i]).is($(anElement))) {
			index = i;
		}
		$(bullets[i]).removeClass("current");
	}		
	slider = slideshow.children().find('.slide-items').first();
	for (var i=0; i<bullets.length; i++) {
		if(index == i) {
			slider.css('margin-left', (i * -100) + "%");
		}
	}
	$(anElement).addClass("current");
}
		
function slide (aSlideshow, aTime) {
	aSlideshow.children().find('.slide-item').first().addClass("current");
	left = aSlideshow.find('.slide-left');
	if(left) {
		left.append('<span onclick="slideLeft(this)"><</span>');
	}
	right = aSlideshow.find('.slide-right');
	if(right) {
		right.append('<span onclick="slideRight(this)">></span>');
	}
	slider = aSlideshow.children('.slide-container').children().first();
	items = jQuery(slider.children());
	slider.css('width', (items.length) * 100 + '%');
	bullets = aSlideshow.find('.bullets');
	if(bullets.length > 0) {
		var width = 0;
		for(var i=0; i<items.length; i++){
			$(items[i]).css('width', (100 / items.length) + '%');
			cssClass = "bullet";
			if(i==0) {
				cssClass = cssClass + " current";
			}
			bullets.append('<div class="' + cssClass + '" onclick="slideFromBullet(this)"></div>');
			width = width + new Number($(".bullet").css("width").split("px")[0]) + new Number($(".bullet").css("margin-right").split("px")[0]) + 2;
		}
		bullets.css("width", width + "px");
	}
	if(aTime > 0) {
		slideAuto(aSlideshow, aTime);
	}
}

function slideAuto(aSlideshow, aTime) {
	setTimeout(function() {
			if(!aSlideshow.is(":hover")) {
				slideRight(aSlideshow)
			} 
			slideAuto(aSlideshow, aTime); 
		}, aTime);
}


