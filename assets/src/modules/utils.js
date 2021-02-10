export function toCSS(obj = {}) {
	return Object
		.keys(obj)
		.map(k => `${k}: ${obj[k]}`)
		.join(';')
}