function slideRight(anElement) {
	slideshow = jQuery(jQuery(jQuery(anElement).parent().parent().children()[1]).children());
	bullets = jQuery(jQuery(slideshow.parent().parent().children()[3]).children()); 
	index = 0;
	for (var i=0; i<bullets.length; i++) {
		if(jQuery(bullets[i]).is(".current")) {
			jQuery(bullets[i]).removeClass("current");
			if((i + 1) == bullets.length) {
				index = 0;
			} else {
				index = i + 1;
			}
		}
	}
	jQuery(bullets[index]).addClass("current");
	for (var i=0; i<bullets.length; i++) {
		if(index == i) {
			slideshow.css('margin-left', (i * -100) + "%");
		}
	}
}

function slideLeft(anElement) {
	slideshow = $($$($(anElement).parent().parent().children()[1]).children());
	bullets = $($(slideshow.parent().parent().children()[3]).children()); 
	index = 0;
	for (var i=0; i<bullets.length; i++) {
		if($(bullets[i]).is(".current")) {
			$(bullets[i]).removeClass("current");
			if(i == 0) {
				index = bullets.length - 1;
			} else {
				index = i - 1;
			}
		}
	}
	$(bullets[index]).addClass("current");
	for (var i=0; i<bullets.length; i++) {
		if(index == i) {
			slideshow.css('margin-left', (i * -100) + "%");
		}
	}
}
		
function slideFromBullet(anElement) {
	var index;
	var bullets = $($(anElement).parent().children());
	for(var i=0; i<bullets.length; i++) {
		if($(bullets[i]).is($(anElement))) {
			index = i;
		}
		$(bullets[i]).removeClass("current");
	}		
	element = $(jQuery(bullets.parent().parent().children()[1]).children()[0]);
	for (var i=0; i<bullets.length; i++) {
		if(index == i) {
			element.css('margin-left', (i * -100) + "%");
		}
	}
	$(anElement).addClass("current");
}
		
function slide (aSlideshow, aTime) {
	left = aSlideshow.children('.slide-left').first();
	if(left) {
		left.append('<span onclick="slideLeft(this)"><</span>');
	}
	right = aSlideshow.children('.slide-right').first();
	if(right) {
		right.append('<span onclick="slideRight(this)">></span>');
	}
	slider = aSlideshow.children('.slide-container').children().first();
	items = jQuery(slider.children());
	slider.css('width', (items.length) * 100 + '%');
	bullets = aSlideshow.children('.bullets');
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
	if(aTime > 0) {
		slideAuto(aSlideshow, aTime);
	}
}

function slideAuto(aSlideshow, aTime) {
	setTimeout(function() {
			if(!aSlideshow.is(":hover")) {
				slideRight(aSlideshow.children('.slide-right').first().children()[0])
			} 
			slideAuto(aSlideshow, aTime); 
		}, aTime);
}


