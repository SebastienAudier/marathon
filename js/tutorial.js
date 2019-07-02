
function openTutorial () {
	TutorialSlider($(".mr-comment")).appendTo($("html"));
}

function TutorialSlider(commentedElements) {
	
	var that = htmlCanvas.widget();
	var margin = 10;
	var index = 0;
		
	that.renderOn = function(html) {
		updateUI();
		html.span("<").addClass("mr-arrow left").click(function () {showPrevious()});		
		html.span(">").addClass("mr-arrow right").click(function () {showNext()});
		html.span("x").addClass("mr-remove").click(function() {closeTutorial()});
	}
	
	function updateUI() {
		removeContent();
		current = $(commentedElements[index]);

		$('body').css({'overflow':'hidden'});
		window.scrollTo(0, 0);


		if($(window).height() < (current.prev().offset().top + current.prev().height())) {
			window.scrollTo(0, current.prev().offset().top);
		} 
		
		HiddingBoxes(current, margin).appendTo($("html"));
		CommentContainer(current, margin).appendTo($("html"));
	}
	
	function showNext () {
		if(index == commentedElements.length - 1) {
			index = 0;
		} else {
			index ++;
		}
		updateUI();
	}
	
	function showPrevious () {
		if(index == 0) {
			index = commentedElements.length - 1;
		} else {
			index --;
		}
		updateUI();
	}
	
	function closeTutorial () {
		removeButtons();
		removeContent();
		$(document).unbind('scroll'); 
		$('body').css({'overflow':'visible'});
	}
	
	function removeButtons() {
		$(".mr-arrow").remove();
		$(".mr-remove").remove();
	}
	
	function removeContent() {
		$(".mr-hidding").remove();
		$(".mr-comment-container").remove();
	}
	
	return that
	
}

function HiddingBoxes (commentedElement, margin) {
			
	var that = htmlCanvas.widget();
	
	that.renderOn = function(html) {
		box = getBoundingBox(commentedElement.prev());
		
		div = html.div().addClass("mr-hidding").asJQuery();
		div.css("top", "0px");
		div.css("left", "0px");
		div.css("height", (box.yMin - margin) + "px");
		div.css("width", "100%");

		div = html.div().addClass("mr-hidding").asJQuery();
		div.css("top", (box.yMin - margin) + "px");
		div.css("left", "0px");
		div.css("height", (box.yMax - box.yMin + (2 * margin)) + "px");
		div.css("width", (window.innerWidth - (window.innerWidth - box.xMin) - margin) + "px");

		div = html.div().addClass("mr-hidding").asJQuery();
		div.css("top", (box.yMin - margin) + "px");
		div.css("right", "0px");
		div.css("height", (box.yMax - box.yMin + (2 * margin)) + "px");
		div.css("width", (window.innerWidth - (box.xMax + (3 * margin))) + "px");

		div = html.div().addClass("mr-hidding").asJQuery();
		div.css("top", (box.yMax + margin) + "px");
		div.css("left", "0px");
		div.css("height", (window.innerHeight - box.yMax) + "px");
		div.css("width", "100%");
	}
	
	function getBoundingBox(element) {
		position = element.offset();
		width = element.outerWidth();
		height = element.outerHeight();
		box = {
				xMin: position.left,
				xMax: position.left + width,
				yMin: position.top - $(window).scrollTop(),
				yMax: (position.top - $(window).scrollTop()) + height}
		return box;
	}
	
	return that
	
}

function CommentContainer (commentedElement, margin) {
	
	var that = htmlCanvas.widget();
	var images = [];
	var videos = [];
	var comments = [];
	
	that.renderOn = function (html) {
		div = getBiggestContainer();
		container = html.div().addClass("mr-comment-container").asJQuery();
		container.css("top", new Number(div.css("top").split("px")[0]) + (6 * margin) + "px");
		container.css("left", new Number(div.css("left").split("px")[0]) + (10 * margin) + "px");
		container.css("height", new Number(div.css("height").split("px")[0]) - (12 * margin) + "px");
		container.css("width", new Number(div.css("width").split("px")[0]) - (20 * margin) + "px");
		container.appendTo($("html"));
		
		for(var i=0; i<commentedElement.children().length; i ++) {
			element = commentedElement.children()[i];
			if($(element).is("img")) {
				images.push($(element).clone());
			} else if ($(element).is("video")) {
				videos.push($(element).clone());
			} else {
				comments.push($(element).clone());
			}
		}
				
		var medias = images.concat(videos);
		if(medias.length > 0) {
			screenshots = html.div().addClass("screenshots").asJQuery();
			screenshots.appendTo(container);
			if(medias.length == 1) {	
				screenshots.append(medias[0]);
			} else {
				container.addClass("medias");
				slideshow = html.div().addClass("slideshow").asJQuery();
				if(comments.length > 0) {
					slideshow.addClass("internal");
				}
				slideshow.appendTo(screenshots);
				slideshow.height((container.height() - 30) + "px");
				if(comments.length == 0) {
					html.div().addClass("slide-left").asJQuery().appendTo(slideshow);
				}
				slideContainer = html.div().addClass("slide-container").asJQuery();
				slideContainer.appendTo(slideshow);
				slideItems = html.div().addClass("slide-items").asJQuery();
				slideItems.appendTo(slideContainer);
				for(each in medias) {
					item = html.div().addClass("slide-item").asJQuery();
					item.append(medias[each]);
					item.appendTo(slideItems);
				}
				if(comments.length == 0) {
					html.div().addClass("slide-right").asJQuery().appendTo(slideshow);		
				} else {
					html.div().addClass("slide-left").asJQuery().appendTo(slideContainer);
					html.div().addClass("slide-right").asJQuery().appendTo(slideContainer);
				}
				html.div().addClass("bullets").asJQuery().appendTo(slideshow);
				slide(slideshow, 3000)
			}
			
			if(comments.length == 0) {
				screenshots.addClass("extra");
			}
		} 
		
		if(comments.length > 0) {
			content = html.div().addClass("comments").asJQuery();
			content.appendTo(container);
			for(var i=0; i<comments.length; i++) {
				content.append(comments[i]);
			}
		}
	}
	
	function getBiggestContainer() {
		div = $($(".mr-hidding")[0]);
		var area = 0;
		for(var i=0; i<$(".mr-hidding").length; i++) {
			currentArea = (new Number($($(".mr-hidding")[i]).css("width").split("px")[0]) * new Number($($(".mr-hidding")[i]).css("height").split("px")[0]));
			if(currentArea >= area) {
				area = currentArea;
				div = $($(".mr-hidding")[i]);
			}
		}
		return div
	}
	
	return that
}

window.onresize = function(event) {
		// update boxes if window...
}