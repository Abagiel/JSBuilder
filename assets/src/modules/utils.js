import { IMAGE, VIDEO } from './types.js';


export function toCSS(s = {}) {
	if (typeof s === 'string') return s;

	return Object.keys(s).map(k => `${k}: ${s[k]}`).join(';')
}

export function fromForm(e) {
	const data = {};

	Array.from(e.target.elements).forEach(el => {
		if (el.type === 'file') {
			data['file'] = el.files[0];
			return;
		}

		if (el.value) {
			data[el.dataset.type] = el.value;
		}
	})

	return data;
}

export function copyHTML(e) {
	const html = document.querySelector('#site').innerHTML;

	e.target.textContent = 'Copied!';
	navigator.clipboard.writeText(html);

	setTimeout(() => e.target.textContent = 'Get HTML', 1000);
}