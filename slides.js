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
	let args = null;
	if (q > -1) {
		let str = h > -1 ? href.substring(q + 1, h) : href.substring(q + 1);
		args = new URLSearchParams(str);
	}
	let speakerNotes = s.querySelector('.speakerNotes');
	let speakerDiv = document.body.querySelector('#speakerNotesBox');
	if (args && args.has('speakerNotes') && speakerNotes) {
		console.log('speaker notes');
		if (!speakerDiv) {
			speakerDiv = document.createElement('div');
			speakerDiv.id = 'speakerNotesBox';


			slide.parent().append(speakerDiv)
		}
		speakerDiv.innerHTML = speakerNotes.innerHTML;
	} else {
		console.log('no speaker notes');
		if(speakerDiv) {
			speakerDiv.remove()
		}
	}

	for(let n of document.querySelectorAll('.speakerNotes')) {
		console.log(n.parentElement);
		console.log('deleting speaker notes');
		console.log(n.outerHTML);
		n.remove();
	}
	if(args && args.has('console')) {
		let d = document.createElement('div');
		d.id = 'consoleBox';

		let ta = document.createElement('textarea');
		ta.style = `width:100%; height:320px; font-size:24px;`;
		d.append(ta);

		function run() {
			

			let s = document.createElement('script');
			s.innerText = ta.value;
			d.append(s);

			let h = document.createElement('pre');
			h.style = 'margin-top:32px;';
			h.innerText = ta.value;
			history.prepend(h);

			h.onclick = () => ta.value = h.innerText;

			ta.value = '';
		}

		let r = document.createElement('button');
		r.innerText = 'Run';
		r.style=  'font-size:32px;'
		r.onclick = run;
		d.append(r);

		let history = document.createElement('div');
		d.append(history);

		slide.parent().append(d);
	}

	for(let n of document.querySelectorAll('#sourceBox')) {
		console.log(n.parentElement);
		console.log('deleting speaker notes');
		console.log(n.outerHTML);
		n.remove();
	}
	
	if(args && args.has('source')) {
		console.log('source');
		let d = document.createElement('div');
		d.id = 'sourceBox';
		let pre = document.createElement('pre');
		pre.innerText = 'Source';
		for(let e of document.body.querySelectorAll("#slide *")) {
			e.onclick = () => pre.innerText = e.outerHTML.replace(pre.innerHTML, 'Source');
		}
		d.append(pre);
		slide.parent().append(d);
	}


	let number = document.getElementById('number');
	if (number) {
		number.value = index;
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
			//case 13: //Enter
			case 34: //Page down
				navigateUrl(index + 1);
				break;
			case 33: //Page up
				navigateUrl(index - 1);
				break;
		}
	}
}