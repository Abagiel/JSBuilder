export function toCSS(obj = {}) {
	if (typeof obj === 'string') return obj;

	return Object
		.keys(obj)
		.map(k => `${k}: ${obj[k]}`)
		.join(';')
}

function selectForm(type, edit) {
	const blockS = type === 'block' ? 'selected' : '';
	const imgS = type === 'img' ? 'selected' : '';

	return !edit ? `
		<select data-type="select" >
			<option value="block" ${blockS} >Block</option>
			<option value="img" ${imgS} >Image</option>
		</select>
	` : '';
}

function createBtn(content, datatype) {
	return `<button data-type="${datatype}">${content}</button>`
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
	const required = !edit ? "required" : '';

	return `<input data-type="file" type="file" "${required}"/>`
}

function textarea(value) {
	return `<textarea data-type="textarea" placeholder="styles">${value}</textarea>`
}

export function form(type, edit = false, el) {
	const inputType = type === 'img' ? imgForm(edit) : simpleForm(el);
	const value = el?.getAttribute('style') || '';
	const formType = !edit ? 'form-add' : 'form-change';
	const submitBtn = !edit ? createBtn('Add', 'btn') : createBtn('Change', 'btn'); 
	const delBtn = edit ? createBtn('Delete', 'btn-del') : '';

	return `
		${selectForm(type, edit)}

		<form data-type="${formType}" >
			${inputType}
			${textarea(value)}
			${submitBtn}
		</form>

		${delBtn}
	`
}
