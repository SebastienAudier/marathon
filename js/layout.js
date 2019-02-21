function roundDown(number, decimals) {
    decimals = decimals || 0;
    return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

function generateCss () {
	str = '.box{float:left; width:100%;height:100%;}';
	for(var i=1; i<13; i++) {
		str += '.box.airy{margin:2%}';
		margin = 2;
		margin = roundDown(margin - Math.min((i * 0.2), 1.75), 2);
		width = roundDown((100 /i), 2);
		str += '.box.b-' + i + '{width: ' + width + '%}';
		str += '.box.b-' + i + '.airy{width: ' + roundDown((width - (margin * 2)),2) + '%; margin:' + margin + '%}';
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = str;
	document.getElementsByTagName('head')[0].appendChild(style);
}

generateCss();

