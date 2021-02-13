export function toCSS(obj = {}) {
	if (typeof obj === 'string') return obj;

	return Object
		.keys(obj)
		.map(k => `${k}: ${obj[k]}`)
		.join(';')
}

function selectForm(type, edit) {
	return !edit ? `
		<select data-type="select" >
			<option value="block" ${type === 'block' ? 'selected' : ''} >Block</option>
			<option value="img" ${type === 'img' ? 'selected' : ''} >Image</option>
		</select>
	` : '';
}

function createBtn(content, datatype) {
	return `<button data-type="${datatype}" >${content}</button>`
}

export function form(type, edit = false, el) {
	const inputType = type === 'img' ? imgForm(edit) : simpleForm(el);
	const value = el?.getAttribute('style') || '';
	const formType = !edit ? 'form-add' : 'form-change';

	return `
		${selectForm(type, edit)}

		<form data-type="${formType}" >
			${inputType}
			<textarea data-type="textarea" placeholder="styles">${value}</textarea>
			${!edit ? createBtn('Add', 'btn') : createBtn('Change', 'btn')}
		</form>
		${edit ? createBtn('Delete', 'btn-del') : ''}
	`
}

function simpleForm(el) {
	const value = el?.textContent ? el.textContent : '';
	const tag = el?.tagName ? el.tagName.toLowerCase() : '';

	return `
		<input value="${tag}" data-type="tag" type="text" placeholder="tag" required />
		<input value="${value}" data-type="content" type="text" placeholder="content" required />
	`
}

function imgForm(edit) {
	return `<input data-type="file" type="file" "${!edit ? "required" : ''}" />`
}