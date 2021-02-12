export function toCSS(obj = {}) {
	if (typeof obj === 'string') return obj;

	return Object
		.keys(obj)
		.map(k => `${k}: ${obj[k]}`)
		.join(';')
}

export function form(type, edit = false) {
	const editForm = type === 'img' ? imgForm() : simpleForm();

	return `
		<select data-type="select" >
			<option value="block" ${type === 'block' ? 'selected' : ''} >Block</option>
			<option value="img" ${type === 'img' ? 'selected' : ''} >Image</option>
		</select>

		<form data-type="form" >
			${editForm}
			<textarea data-type="textarea" placeholder="styles"></textarea>
			<button data-type="btn" >Add</button>
		</form>
		${edit ? '<button data-type="btn-del" >Delete</button>' : ''}
	`
}

function simpleForm() {
	return `
		<input data-type="tag" type="text" placeholder="tag" required />
		<input data-type="content" type="text" placeholder="content" required />
	`
}

function imgForm() {
	return `<input data-type="file" type="file" required />`
}