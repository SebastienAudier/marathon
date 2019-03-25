function generateTutorialCss () {
 	str = '.mr-comment {display: none;};';
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = str;
	document.getElementsByTagName('head')[0].appendChild(style);
}

generateTutorialCss();

function openTutorial () {
	
}