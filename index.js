init();

function navigateHref() {
	let anchor = location.href.indexOf("#");
	if (anchor > -1) {
		anchor = location.href.substring(anchor + 1);
		navigateSlide(anchor)
	}
}
function init() {
	let anchor = location.href.indexOf("#");
	if (anchor > -1) {
		anchor = location.href.substring(anchor + 1);
		navigateSlide(anchor)
	} else {
		anchor = location.href + '#0';
		location.href = anchor;
	}
	window.addEventListener('hashchange', function () {
		let anchor = location.href.indexOf("#");
		if (anchor > -1) {
			anchor = location.href.substring(anchor + 1);
			navigateSlide(anchor)
		}
	})
}
function navigateSlide(index) {
	let slides = document.getElementById('slides');
	let s = slides.children[parseInt(index)].outerHTML

	console.log(`navigate slide: ${index}`);

	let slide = $('#slide');
	slide.html(s);
	slide.off('click');
	slide.click(function () {
		let next = parseInt(index) + 1;
		console.log('click: ' + next)

		if (next >= slides.children.length) {
			console.log('no slide: ' + next)
			return;
		}

		let link = location.href;
		let i = link.indexOf('#')
		if (i > -1) {
			link = link.substring(0, i);
		}
		link += `#${next}`;
		window.location = link;
	});

	function onkeypress(event) {
		let k = event.which;
		console.log('keypress: ' + k)
		switch (k) {
			case 13: //Enter
			case 39: //Right
				navigateSlide(index + 1);
				break;
			case 37: //Left
				navigateSlide(index - 1);
				break;
		}
	}
}