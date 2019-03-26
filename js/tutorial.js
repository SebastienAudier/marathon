
function openTutorial () {
	boxes = [];
	comments = $(".mr-comment");
	for(var i=0; i<comments.length; i++) {
		target = $(comments[i]).prev();
		boxes.push(HiddingBoxes(target));
	}
	boxes[0].appendTo($("html"));
}

function getBoundingBox(element) {
	
	position = element.offset();
	width = element.outerWidth();
	height = element.outerHeight();
	box = {
			xMin: position.left,
			xMax: position.left + width,
			yMin: position.top,
			yMax: position.top + height}

	return box;
}

function HiddingBoxes(element) {
	
	var that = htmlCanvas.widget();
	var margin = 10;
	
	that.renderOn = function(html) {
		
		box = getBoundingBox(element);
		
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
		

		div = getBiggestContainer();
		
		container = html.div().addClass("mr-comment-container").asJQuery();
			
		var top = new Number(div.css("top").split("px")[0]) + (4 * margin) + "px";
		container.css("top", top);
		

		var left = (new Number(div.css("left").split("px")[0]) + (10 * margin)) + "px";

		container.css("left", left);
		
		var height = (new Number(div.css("height").split("px")[0]) - (10 * margin)) + "px";
		container.css("height", height);
		
		var width = (new Number(div.css("width").split("px")[0]) - (16 * margin)) + "px";
		container.css("width", width);
		
		container.appendTo($("html"));
		
		$('body').css({'overflow':'hidden'});
		$(document).bind('scroll',function () { 
			window.scrollTo(0,0); 
		});
		
		// When finish
		
		//$(document).unbind('scroll'); 
		//$('body').css({'overflow':'visible'});
	
		//arrows

		html.span("<").addClass("mr-arrow left").asJQuery().appendTo("html");		
		html.span(">").addClass("mr-arrow right").asJQuery().appendTo("html");

	}

	function getBiggestContainer() {
		div = $($(".hidding")[0]);
		var area = 0;
		for(var i=0; i<$(".mr-hidding").length; i++) {
			currentArea = (new Number($($(".mr-hidding")[i]).css("width").split("px")[0]) * new Number($($(".mr-hidding")[0]).css("height").split("px")[0]));
			if( currentArea >= area) {
				area = currentArea;
				div = $($(".mr-hidding")[i]);
			}
		}
		
		return div;
	}
	
	return that
	
}

window.onresize = function(event) {
		// update boxes if window...
}