export function toCSS(obj = {}) {
	return Object
		.keys(obj)
		.map(k => `${k}: ${obj[k]}`)
		.join(';')
}

export function form(type) {
	return `
		<select data-type="select" >
			<option value="block" ${type === 'block' ? 'selected' : ''} >Block</option>
			<option value="img" ${type === 'img' ? 'selected' : ''} >Image</option>
		</select>
		<button>Add</button>
	`
}

export function inputForm(type) {
	console.log('Ytpe', type);
	return type === 'img'
		? imgForm()
		: simpleForm()
}

function simpleForm() {

}

function imgForm() {
	return `<input data-type="file" type="file" />`
}