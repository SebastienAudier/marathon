var debug;
		
			function replaceAll(str, find, replace) {
				return str.replace(new RegExp(find, 'g'), replace);
			}
			
			function copy(element) {
				var $temp = $("<textarea>");
				$("body").append($temp);
				str = replaceAll(element.text(), '><', '>\n<');
				$temp.val(str).select();
				document.execCommand("copy");
				$temp.remove();
				element.effect("highlight", {}, 600);
			}
			
			function updateFromHash (aString) {
				var hash = "start";
				if(aString != "") {
					hash = aString.split("#")[1];
				}
				resetContainer();
				$(".selected").removeClass("selected");
				$(".nav ." + hash).addClass("selected");
				if(hash == "start") {
					StartPage().appendTo($("#container"));
				} else if(hash == "buttons") {
					Buttons().appendTo($("#container"));
				} else if(hash == "layouts") {
					Layouts().appendTo($("#container"));
				} else if(hash == "tutorial") {
					Tutorial().appendTo(container);
				} else if(hash == "slider") {
					Slider().appendTo(container);
				}
			}
			
			function resetContainer() {
				container = $('#container');
				container.html('');
			}
			
			jQuery(window).on('hashchange', function() {
				updateFromHash(window.location.hash);
			});
			
			function Header() {
			
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					html.h1("Marathon");
				}
				
				return that
			}

			function Browser() {
			
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					sidebar = html.div().addClass("sidebar").asJQuery();	
					nav = html.div().addClass("nav").asJQuery();
					nav.appendTo(sidebar);
					html.span("Start").addClass("page selected start").click(function () {window.location.hash = "start"}).asJQuery().appendTo(nav);
					html.span("Atomic").asJQuery().appendTo(nav);
					AtomicMenu().appendTo(nav);
					html.span("Complex").asJQuery().appendTo(nav);
					ComplexMenu().appendTo(nav);
					html.div().setAttribute('id', 'container');
				}
								
				return that
			}
	
			function StartPage() {
			
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					container = html.div().addClass("panel").asJQuery();
					html.h2("How to start ?").asJQuery().appendTo(container);
					html.div().addClass("clear");
					html.h3("External libraries").asJQuery().appendTo(container);
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(container);
				
					var code ='<script type="text/javascript" src="./src/js/external/jquery-2.1.4.min.js"><\/script>\n<script type="text/javascript" src="./src/js/external/htmlCanvas.js"><\/script>';
						var editor = CodeMirror(renderer[0], {
						value: code,
						mode: "xml",
						matchbrackets: true
					});
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);
					
					html.div().addClass("clear");
					html.h3("Internal libraries").asJQuery().appendTo(container);
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(container);
				
					var code ='<script type="text/javascript" src="./src/js/marathon.min.js"><\/script>\n<link rel="sylesheet" href="./src/css/marathon.min.css">';
						var editor = CodeMirror(renderer[0], {
						value: code,
						mode: "xml",
						matchbrackets: true
					});
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);
				}
								
				return that
			}
	
	
			function AtomicMenu() {
			
				var that = htmlCanvas.widget();
				var nav;
				
				that.renderOn = function(html) {
					nav = html.div().addClass("nav").asJQuery();
					html.span("CSS").asJQuery().appendTo(nav);
					CssMenu().appendTo(nav);
				}
				
				return that
			}
			
			function ComplexMenu() {
			
				var that = htmlCanvas.widget();
				var nav;
				
				that.renderOn = function(html) {
					nav = html.div().addClass("nav").asJQuery();
					html.span("Components").asJQuery().appendTo(nav);
					ComponentsMenu().appendTo(nav);
					html.span("Modes").asJQuery().appendTo(nav);
					ModesMenu().appendTo(nav);
				}
				
				return that
			}
			
	
			function CssMenu() {
			
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					html.span("Buttons").addClass("page buttons").click(function(){window.location.hash = "buttons"});
					html.span("Layouts").addClass("page layouts").click(function(){window.location.hash = "layouts"})
				}
			
				return that
			}
			
			function ComponentsMenu() {
			
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					html.span("Slider").addClass("page slider").click(function(){window.location.hash = "slider"});
				}
							
				return that
			}
			
			function ModesMenu() {
			
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					html.span("Tutorial").addClass("page tutorial").click(function(){window.location.hash = "tutorial"});
				}
							
				return that
			}
			
			function Tutorial() {
					
				var that = htmlCanvas.widget();
				var yellow = "#fff592";
				var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ";
				
				that.renderOn = function(html) {
					div = html.div().addClass("panel tutorial").asJQuery();
					html.h2("Example").asJQuery().appendTo(div);
					html.p(loremIpsum).asJQuery().appendTo(div);
					html.hr().asJQuery().appendTo(div);
					html.p(loremIpsum).asJQuery().appendTo(div);
					comment = html.div().addClass("mr-comment").asJQuery();
					html.img().setAttribute("src", "./img/picture.png").asJQuery().appendTo(comment);
					html.h2("This is an h2 element...").asJQuery().appendTo(comment);
					html.span("This is the first comment on this element...").asJQuery().appendTo(comment);
					html.h3("This is an h3 element...").asJQuery().appendTo(comment);
					html.span("This is the last comment on this element...").asJQuery().appendTo(comment);
					comment.appendTo(div);
					html.p(loremIpsum).asJQuery().appendTo(div);
					comment = html.div().addClass("mr-comment").asJQuery();
					html.span(loremIpsum).asJQuery().appendTo(comment);
					comment.appendTo(div);
					html.hr().asJQuery().appendTo(div);
					html.p(loremIpsum).asJQuery().appendTo(div);
					comment = html.div().addClass("mr-comment").asJQuery();
					html.img().setAttribute("src", "./img/slider/s1.jpg").asJQuery().appendTo(comment);
					html.img().setAttribute("src", "./img/slider/s2.jpg").asJQuery().appendTo(comment);
					html.img().setAttribute("src", "./img/slider/s3.jpg").asJQuery().appendTo(comment);
					html.h2("This is an h2 element...").asJQuery().appendTo(comment);
					html.span("This is the first comment on this element...").asJQuery().appendTo(comment);
					html.h3("This is an h3 element...").asJQuery().appendTo(comment);
					html.span("This is an other comment on this element...").asJQuery().appendTo(comment);
					html.span("This is the last comment on this element...").asJQuery().appendTo(comment);
					comment.appendTo(div);
					
					html.p(loremIpsum + loremIpsum + loremIpsum + loremIpsum + loremIpsum + loremIpsum + loremIpsum).asJQuery().appendTo(div);
					comment = html.div().addClass("mr-comment").asJQuery();
					html.img().setAttribute("src", "./img/slider/s1.jpg").asJQuery().appendTo(comment);
					html.img().setAttribute("src", "./img/slider/s2.jpg").asJQuery().appendTo(comment);
					html.img().setAttribute("src", "./img/slider/s3.jpg").asJQuery().appendTo(comment);
					comment.appendTo(div);
					
					code = replaceAll($(".panel.tutorial").html(), "</h1>", "</h1>\n");
					code = replaceAll(code, "</p>", "</p>\n");
					code = replaceAll(code, "<hr>", "<hr>\n");
					code = replaceAll(code, "<img", "\n\t<img");
					code = replaceAll(code, "<span>", "\n\t<span>");
					code = replaceAll(code, "</div>", "\n</div>\n");
					code = replaceAll(code, "><h2>", ">\n\t<h2>");
					code = replaceAll(code, "</h2><p>", "<h2>\n<p>");
					code = replaceAll(code, "<h3>", "\n\t<h3>");
									
					html.div().addClass("break").asJQuery().appendTo(div);
					
					html.h2("Code source").asJQuery().appendTo(div);
					
					renderer = html.div().addClass("renderer extra").asJQuery();
					renderer.appendTo(div);
					
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					
					for(var i=4; i<11; i++) {
						$($(".CodeMirror-line")[i]).css("background", yellow);
						$($(".CodeMirror-line")[i]).css("font-weight", "bold");
					}
					
					html.button("Try it").addClass("primary").click(function () {openTutorial()}).asJQuery().appendTo(div);
					
					html.div().addClass("break").asJQuery().appendTo(div);
					
					html.h2("How to use it ?").asJQuery().appendTo(div);
					
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(div);
					
					var editor = CodeMirror(renderer[0], {
							value: '<button onclick="openTutorial()"></button>',
							matchbrackets: true
					});
					
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);
					
					
					html.h2("How to load it alone ?").asJQuery().appendTo(div);
					
					html.h3("External libraries").asJQuery().appendTo(div);
					
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(div);
					
					var code ='<script type="text/javascript" src="./src/js/external/jquery-2.1.4.min.js"><\/script>\n<script type="text/javascript" src="./src/js/external/htmlCanvas.min.js"><\/script>';
					
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);

					html.h3("Internal libraries").asJQuery().appendTo(div);
					
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(div);
					
					var code ='<script type="text/javascript" src="./src/js/tutorial.min.js"><\/script>\n<link rel="sylesheet" href="./src/css/tutorial.min.css">';
					
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);			
				}
								
				return that
			}
			
			function Slider () {
				
				var that = htmlCanvas.widget();
				var slideMode = "external";
				var displayBullet = true;
				var time = 3000;
				var count = 4;
			
				that.renderOn = function(html) {
					boxes = html.div().addClass('boxes b-4').asJQuery();
					html.span('Arrows:').addClass("box").asJQuery().appendTo(boxes);
					
					select = html.select().addClass("box").asJQuery();
					select.change(function (event) {slideMode = event.target.value; update()});
					select.appendTo(boxes);

					html.option('External').setAttribute("value", "external").asJQuery().appendTo(select);
					html.option('Internal').setAttribute("value", "internal").asJQuery().appendTo(select);
					html.option('None').setAttribute("value", "none").asJQuery().appendTo(select);

					html.span('Display bullets :').addClass("box").asJQuery().appendTo(boxes);
					select = html.select().addClass("box").asJQuery();
					select.change(function (event) { displayBullet = (event.target.value == 1); update()});
					select.appendTo(boxes);

					html.option('yes').setAttribute("value", 1).asJQuery().appendTo(select);
					html.option('no').setAttribute("value", 0).asJQuery().appendTo(select);
					
					html.div().addClass("break").asJQuery().appendTo(boxes);

					html.span('Number of slides :').addClass("box").asJQuery().appendTo(boxes);
					select = html.select().addClass("box").asJQuery();
					select.change(function (event) {count = event.target.value; update()});
					select.appendTo(boxes);

					var i = 1;
					while(i<13) {
						option = html.option(i.toString()).setAttribute("value", i);
						if(i==4) {
							option.setAttribute("selected", "selected");
						} 	
						option.asJQuery().appendTo(select);
						i++
					}
					
					html.span('Time for event (ms):').addClass("box").asJQuery().appendTo(boxes);
					box = html.div().addClass("box").addClass("box").asJQuery();
					input = html.input().setAttribute("value", time).asJQuery();
					input.keyup(function (e) {if(e.keyCode == 13) {time = new Number(e.target.value); update()}});
					input.appendTo(box);
					box.appendTo(boxes);

					html.div().addClass("slideshow");

					html.div().addClass("break");

					div = html.div().addClass("panel").asJQuery();

					html.h2("How to build it ?").asJQuery().appendTo(div);

					html.div().addClass("renderer large").asJQuery().appendTo(div);	
					
					update();					
					
					html.h2("How to load it alone ?").asJQuery().appendTo(div);
					
					ExternalLibraries().appendTo(div);

					html.h3("Internal libraries").asJQuery().appendTo(div);
					
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(div);
					var code ='<script type="text/javascript" src="./src/js/slider.min.js"><\/script>\n<link rel="sylesheet" href="./src/css/slider.min.css">';
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);	
				}
				
				function update() {
					reset();
					generateSlideshow();
					if(slideMode == "external") {
						code = '<div class="slideshow">';
						code = code + '\n\t<div class="slide-left"></div>';
					} else {
						code = '<div class="slideshow ' + slideMode + '">';
					}
					
					code = code + '\n\t<div class="container">';
					code = code + '\n\t\t<div class="slide-items">';
					for(var i=0; i<count; i++) {
						code = code + '\n\t\t\t<div class="slide-item">...</div>';
					}
					code = code + '\n\t\t</div>';
					if(slideMode == "internal") {
						code = code + '\n\t\t<div class="slide-left"></div>';
						code = code + '\n\t\t<div class="slide-right"></div>';
					}	
					code = code + '\n\t</div>';
					if(slideMode == "external") {
						code = code + '\n\t<div class="slide-right"></div>';
					}
					if(displayBullet) {
						code = code + '\n\t<div class="bullets"></div>';
					}
					code = code + '\n</div>';
					code = code + '\n<script>slide($(".slideshow"), ' + time + ')</script>';
					
					var editor = CodeMirror($(".renderer")[0], {
							value: code,
							matchbrackets: true
					});
					$(".renderer.large").append('<span class="copy" onclick="copy($(this).prev().find(\'.CodeMirror-line\'))"></span>')
				}

				function reset() {
					$(".slideshow").replaceWith('<div class="slideshow"></div>');
					$(".renderer.large").html("");
					$(".slideshow").removeClass("external");
					$(".slideshow").removeClass("internal");
					$(".slideshow").removeClass("none");
					$(".slideshow").addClass(slideMode);
				}
				
				function generateSlideshow() {
					slideshow = $(".slideshow");
					slideshow.html("");
					if(slideMode == "external") {
						SlideLeftButton().appendTo(slideshow);
						SlideContainer(count).appendTo(slideshow);
						SlideRightButton().appendTo(slideshow);
					} else if(slideMode == "none") {
						SlideContainer(count).appendTo(slideshow);
					} else {
						SlideContainer(count).appendTo(slideshow);
						SlideLeftButton().appendTo(slideshow.children().first());
						SlideRightButton().appendTo(slideshow.children().first());
					}
					if(displayBullet) {
						SlideBullets().appendTo(slideshow);
					}
					slide(slideshow, time);
				}
				
				return that
			}
			
			function SlideContainer(anInteger) {
				var that = htmlCanvas.widget();
				var container;

				that.renderOn = function (html) {
					container = html.div().addClass("slide-container");
					SlideItems(anInteger).appendTo(container.asJQuery());
				}
				
				return that
			}

			function SlideItems(anInteger) {
				var that = htmlCanvas.widget();
				var items;

				that.renderOn = function (html) {
					items = html.div().addClass("slide-items");
					if(anInteger>0) {
						item = html.div().addClass("slide-item").asJQuery();
						html.img().setAttribute("src", "./img/slider/s1.jpg").asJQuery().appendTo(item);
						item.appendTo(items.asJQuery());
					}
					if(anInteger>1) {
						item = html.div().addClass("slide-item").asJQuery();
						html.img().addClass("picture").setAttribute("src", "./img/picture.png").asJQuery().appendTo(item);
						html.h2("Example html content").asJQuery().appendTo(item);
						html.span("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").asJQuery().appendTo(item);
						item.appendTo(items.asJQuery());
					}
					if(anInteger>2) {
						item = html.div().addClass("slide-item").asJQuery();
						html.img().setAttribute("src", "./img/slider/s2.jpg").asJQuery().appendTo(item);
						item.appendTo(items.asJQuery());
					}
					if(anInteger>3) {	
						item = html.div().addClass("slide-item").asJQuery();
						item.appendTo(items.asJQuery());
						html.img().setAttribute("src", "./img/slider/s3.jpg").asJQuery().appendTo(item);
					}
					if(anInteger>4) {
						for(var i=4; i<anInteger; i++) {
							item = html.div().addClass("slide-item").asJQuery();
							html.img().addClass("picture").setAttribute("src", "./img/picture.png").asJQuery().appendTo(item);
							html.h2("Example html content").asJQuery().appendTo(item);
							html.span("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.").asJQuery().appendTo(item);
							item.appendTo(items.asJQuery());
						}
					}
				}
				
				return that
			}
			
			function SlideLeftButton() {
				var that = htmlCanvas.widget();

				that.renderOn = function (html) {
					html.div().addClass("slide-left")
				}

				return that
			}
			
			function SlideRightButton() {
				var that = htmlCanvas.widget();

				that.renderOn = function (html) {
					html.div().addClass("slide-right")
				}

				return that
			}

			function SlideBullets() {
				var that = htmlCanvas.widget();

				that.renderOn = function (html) {
					html.div().addClass("bullets");
				}

				return that
			}
			
			
			function ExternalLibraries() {
				var that = htmlCanvas.widget();
				
				that.renderOn = function (html) {
					html.h3("External libraries");
					renderer = html.div().addClass("renderer small").asJQuery();
					var code ='<script type="text/javascript" src="./src/js/external/jquery-2.1.4.min.js"><\/script>\n<script type="text/javascript" src="./src/js/external/htmlCanvas.min.js"><\/script>';
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);
				}
				
				return that
			}
			
			function Buttons () {
				
				var that = htmlCanvas.widget();
				var classes = ['default', 'success', 'primary', 'warning', 'danger'];
				
				that.renderOn = function(html) {
					for(i in classes) {
						c = classes[i];
						panel = html.div().addClass('panel buttons').asJQuery();
						code = '<button class="' + c + '"></button>';
						renderer = html.div().addClass("renderer").asJQuery();
						renderer.appendTo(panel);
						var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
						});
						html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);
						html.button(c).addClass(c).asJQuery().appendTo(panel);
					}
					
					panel = html.div().addClass("panel").asJQuery();
					html.h2("How to load it alone ?").asJQuery().appendTo(panel);
					
					html.h3("Internal libraries").asJQuery().appendTo(panel);
					
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(panel);
					var code ='<link rel="sylesheet" href="./src/css/button.min.css">';
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);	
					
				}
				
				return that
			}
			
			function Layouts() {
			
				var that = htmlCanvas.widget();
				var isAiry = false;
				var count = 6;

				that.renderOn = function(html) {
					boxes = html.div().addClass('boxes b-4').asJQuery();
					html.span('Box number :').addClass("box").asJQuery().appendTo(boxes);
					
					select = html.select().addClass("box").asJQuery();
					select.change(function (event) {count = event.target.value; generateLayouts()});
					select.appendTo(boxes);

					var i = 1;
					while(i<13) {
						option = html.option(i.toString()).setAttribute("value", i);
						if(i==count) {
							option.setAttribute("selected", "selected")
						}
						option.asJQuery().appendTo(select);						
						i++
					}

					html.span('Is airy :').addClass("box").asJQuery().appendTo(boxes);
					select = html.select().addClass("box").asJQuery();
					select.change(function (event) {isAiry = event.target.value != false; generateLayouts()});
					select.appendTo(boxes);

					html.option('no').setAttribute("value", 0).asJQuery().appendTo(select);
					html.option('yes').setAttribute("value", 1).asJQuery().appendTo(select);

					html.div().setAttribute("id", "builder");
					
					html.div().addClass("renderer");
					
					generateLayouts();
					
					panel = html.div().addClass("panel").asJQuery();
					html.h2("How to load it alone ?").asJQuery().appendTo(panel);
					
					html.h3("Internal libraries").asJQuery().appendTo(panel);
					
					renderer = html.div().addClass("renderer small").asJQuery();
					renderer.appendTo(panel);
					var code ='<script type="text/javascript" src="./src/js/external/layout.min.js"><\/script>';
					var editor = CodeMirror(renderer[0], {
							value: code,
							matchbrackets: true
					});
					
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))}).asJQuery().appendTo(renderer);
					
				}
				
				function generateLayouts() {
					$("#builder").html("")
					Builder(count, isAiry).appendTo($("#builder"));
					$(".renderer").html("");
					code = replaceAll(replaceAll(replaceAll(replaceAll($("#builder").html(), " dark", ""), "><div", ">\n\t<div"), "</div><div", "</div>\n<div"), "</div></div>", "</div>\n</div>");
					
					var editor = CodeMirror($(".renderer")[0], {
						value: code,
						matchbrackets: true
					});
					
					LayoutCopy().appendTo($(".renderer"))
				}
				
				return that
			}
			
			function LayoutCopy () {
				
				var that = htmlCanvas.widget();

				that.renderOn = function(html) {
					html.span().addClass("copy").click(function () {copy($(this).prev().find(".CodeMirror-line"))})
				}
				
				function copy(element) {
					var $temp = $("<textarea>");
					$("body").append($temp);
					str = replaceAll(replaceAll(element.text(), "    ", "\n\t"), "</div></div>", "</div>\n</div>");
					$temp.val(str).select();
					document.execCommand("copy");
					$temp.remove();
					element.effect("highlight", {}, 600);
				}
				
				return that
			}
			
			function Builder(number, isAiry){
				
				var that = htmlCanvas.widget();
				
				that.renderOn = function(html) {
					boxes = html.div().addClass("boxes b-" + number).asJQuery();
					if(isAiry) {
						boxes.addClass("airy");
					}
					var i = 0;
					while(i<number) {						
						box = html.div().addClass("box").asJQuery();
						if(i % 2) {
							box.addClass("dark");
						}
						//if(number>1 && number<6) {
						//	buttons = html.div().addClass("buttons").asJQuery();
						//	buttons.appendTo(box);
						//	button = html.button().addClass("default").asJQuery();
						//	button.html("&#8614; &#8612;");
						//	button.click(function () {decrease($(this))});
						//	button.appendTo(buttons);
						//	button = html.button().addClass("primary").asJQuery();
						//	button.html("&#8596;");
						//	button.click(function () {increase($(this))});
						//	button.appendTo(buttons);
						//}
						box.appendTo(boxes);
						i++	
					}

				}
				
				function increase(button) {
					
				}
				
				function decrease(element) {
					
				}

				return that
			}
	
			Header().appendTo($('body'));
			
			Browser().appendTo($('body'));

			updateFromHash(window.location.hash);