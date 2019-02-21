function generateCss () {
	str = '';
	for(var i=1; i<13; i++) {
		str +=  '.box.b-' + i + '{width: ' + (100 /i) + '%} '
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = str;
	document.getElementsByTagName('head')[0].appendChild(style);
}

generateCss();

