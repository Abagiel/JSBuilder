export function toCSS(obj = {}) {
	if (typeof obj === 'string') return obj;

	return Object
		.keys(obj)
		.map(k => `${k}: ${obj[k]}`)
		.join(';')
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

function selectForm(type, edit) {
	const blockS = type === 'block' ? 'selected' : '';
	const imgS = type === 'img' ? 'selected' : '';

	return !edit 
		? `
		<select data-type="select" >
			<option value="block" ${blockS} >Block</option>
			<option value="img" ${imgS} >Image</option>
		</select>
	` : '';
}

function createBtn(content, type) {
	return `<button data-type="${type}">${content}</button>`
}

function createInput(value, type, dataset, ph, req) {
	const required = req ? 'required' : '';

	return `<input 
		value="${value}" 
		type="${type}"
		data-type="${dataset}" 
		placeholder="${ph}"
		${required} />`
}

function simpleForm(el) {
	let value = '', tag = '';

	if (el) {
		value = el.textContent;
		tag = el.tagName.toLowerCase();
	}

	return `
		${createInput(tag, 'text', 'tag', 'tag', true)}
		${createInput(value, 'text', 'content', 'content', true)}
	`
}

function imgForm(edit) {
	return createInput('', 'file', 'file', '', !edit)
}

function stylesField(value) {
	return `<textarea data-type="styles" placeholder="styles">${value}</textarea>`
}

function getEditData(edit, el) {
	let formType = 'form-add';
	let submitBtn = createBtn('Add', 'btn');
	let delBtn = '';
	let styles = '';

	if (edit) {
		styles = el.getAttribute('style');
		formType = 'form-change';
		submitBtn = createBtn('Change', 'btn');
		delBtn = createBtn('Delete', 'btn-del');
	}

	return { formType, submitBtn, delBtn, styles }
}

export function form(type, edit = false, el) {
	const inputType = type === 'img' ? imgForm(edit) : simpleForm(el);
	const data = getEditData(edit, el);

	return `
		${selectForm(type, edit)}

		<form data-type="${data.formType}" >
			${inputType}
			${stylesField(data.styles)}
			${data.submitBtn}
		</form>

		${data.delBtn}
	`
}
