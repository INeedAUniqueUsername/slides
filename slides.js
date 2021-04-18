init();
var slideIndex = null;

function navigateHref() {
	let anchor = location.href.indexOf("#");
	if (anchor > -1) {
		anchor = location.href.substring(anchor + 1);
		navigateSlide(anchor)
		return true;
	}
	return false;
}
function init() {
	window.addEventListener('hashchange', navigateHref)
	if (navigateHref()) {
		return;
	}
	anchor = location.href + '#0';
	location.href = anchor;
}
function navigateUrl(next) {
	if (next < 0 || next >= slides.children.length) {
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
}
function navigateSlide(index) {
	slideIndex = index;
	let slides = document.getElementById('slides');
	let s = document.getElementById(index);
	if (!s) {
		index = parseInt(index);
		s = slides.children[index];
	}

	console.log(`navigate slide: ${index}`);

	if (!s) {
		console.log('invalid index: ' + index);
		return;
	}

	let html = s.outerHTML;
	let slide = $('#slide');
	slide.html(html);

	let href = location.href;
	let q = href.indexOf("?");
	let h = href.indexOf("#");
	if (q > -1) {

		let str = h > -1 ? href.substring(q + 1, h) : href.substring(q + 1);
		let args = new URLSearchParams(str);
		if (args.has('speakerNotes')) {
			let speakerNotes = s.querySelector('.speakerNotes');
			if (speakerNotes) {
				let speakerDiv = document.body.querySelector('.speakerNotesBox');
				if (!speakerDiv) {
					speakerDiv = document.createElement('div');
					speakerDiv.className = 'speakerNotesBox';
					slide.parent().append(speakerDiv)
				}
				speakerDiv.innerHTML = speakerNotes.innerHTML;
			} else {
				let speakerDiv = document.body.querySelector('.speakerNotesBox');
				if (speakerDiv)
					speakerDiv.remove()
			}
		}
	}

	let next = $('#next');
	next.off('click');
	next.click(function () {
		let next = parseInt(index) + 1;
		console.log('click: ' + next)

		navigateUrl(next);
	});

	let prev = $('#prev');
	prev.off('click');
	prev.click(function () {
		let prev = parseInt(index) - 1;
		console.log('click: ' + prev)

		navigateUrl(prev);
	});


	

	window.onkeydown = onkeypress;
	function onkeypress(event) {
		let k = event.which;
		console.log('keypress: ' + k)
		switch (k) {
			case 13: //Enter
			case 39: //Right
				navigateUrl(index + 1);
				break;
			case 37: //Left
				navigateUrl(index - 1);
				break;
		}
	}
}