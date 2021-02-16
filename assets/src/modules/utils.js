export function toCSS(s = {}) {
	if (typeof s === 'string') return s;

	return Object.keys(s).map(k => `${k}: ${s[k]}`).join(';')
}

export function fromForm(e) {
	const data = {};

	Array.from(e.target.elements).forEach(el => {
		if (el.dataset.type === 'file') {
			data['file'] = el.files[0];
			return;
		}

		if (el.tagName === 'INPUT' ||
				el.tagName === 'TEXTAREA') {
			data[el.dataset.type] = el.value;
		}
	})

	return data;
}