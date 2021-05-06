function setHTML(str) {
	str = str
		.replaceAll('&', '&amp;')
		//.replaceAll('<', '&lt;')
		//.replaceAll('>', '&gt;')
		//.replaceAll('"', '&quot;').trim();
	//console.log(str);
	let e = document.currentScript.parentElement
	e.innerHTML = '';
	e.innerText = str;
}