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
	slideshow = jQuery(jQuery(jQuery(anElement).parent().parent().children()[1]).children());
	bullets = jQuery(jQuery(slideshow.parent().parent().children()[3]).children()); 
	index = 0;
	for (var i=0; i<bullets.length; i++) {
		if(jQuery(bullets[i]).is(".current")) {
			jQuery(bullets[i]).removeClass("current");
			if(i == 0) {
				index = bullets.length - 1;
			} else {
				index = i - 1;
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
		
function slideFromBullet(anElement) {
	var index;
	var bullets = jQuery(jQuery(anElement).parent().children());
	for(var i=0; i<bullets.length; i++) {
		if(jQuery(bullets[i]).is(jQuery(anElement))) {
			index = i;
		}
		jQuery(bullets[i]).removeClass("current");
	}		
	element = jQuery(jQuery(bullets.parent().parent().children()[1]).children()[0]);
	for (var i=0; i<bullets.length; i++) {
		if(index == i) {
			element.css('margin-left', (i * -100) + "%");
		}
	}
	jQuery(anElement).addClass("current");
}
		
function slide (aTime, aSlideshow) {
	setTimeout(function() {
		if(!aSlideshow.parent().parent().parent().is(":hover")) {
			slideRight(jQuery(jQuery(aSlideshow.parent().parent().children()[2]).children()[0]));
		} 
		slide(aTime, aSlideshow); 
	}, aTime);
}


