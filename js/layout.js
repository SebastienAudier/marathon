function roundDown(number, decimals) {
    decimals = decimals || 0;
    return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

function generateCss () {
 	str = ' .boxes{float:left; width:100%;} .boxes.airy{margin:2%} .boxes .box{float: left; width: 100%} ';
	for(var i=1; i<13; i++) {
		margin = 2;
		margin = roundDown(margin - Math.min((i * 0.2), 1.75), 2);
		width = roundDown((100 /i), 2);
		str += ' .boxes.b-' + i + ' .box {width: ' + width + '%}';
		str += ' .boxes.b-' + i + '.airy .box {width: ' + roundDown((width - (margin * 2)),2) + '%; margin:' + margin + '%}';
		//for(var j=1; j<(10-i); j++) {
		//	str += '.box.b-' + i + '.w-' + j +'{width: ' + roundDown((100 * (j/ (j + 1))), 2) + '%}';
			//str += '.box.b-' + i + '.airy{width: ' + roundDown((width - (margin * 2)),2) + '%; margin:' + margin + '%}';
		//}
	
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = str;
	document.getElementsByTagName('head')[0].appendChild(style);
}

generateCss();

