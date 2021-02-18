import { IMAGE, VIDEO, _DEFAULT } from '../types.js';

import { createInput, stylesField } from './inputs.js';
import createBtn from './buttons.js';
import selectForm from './select.js';


const inputTypes = {
	[VIDEO](el) {
		let value = '';

		if (el) {
			value = !el.src.includes('data:video') ? el.src : '';
		}

		return `
			${createInput('', 'file', VIDEO, false, '.mp4')}
			${createInput(value, 'text', 'url', false)}
		`;
	},

	[IMAGE](el) {
		let value = '';

		if (el) {
			value = !el.src.includes('data:image') ? el.src : '';
		}

		return `
			${createInput('', 'file', IMAGE, false, '.png,.jpg,.jpeg,.gif')}
			${createInput(value, 'text', 'url', false)}
		`;
	},

	[_DEFAULT](el) {
		let value = '', tag = '';

		if (el) {
			value = el.textContent;
			tag = el.tagName.toLowerCase();
		}

		return `
			${createInput(tag, 'text', 'tag', true)}
			${createInput(value, 'text', 'content', true)}
		`
	}
}

const submitBtn = el => el ? createBtn('Change') : createBtn('Add');
const delBtn = el => el ? createBtn('Delete', 'btn-del') : '';
const formType = el => el ? 'form-change' : 'form-add';
const HTMLBtn = createBtn('Get Html', 'btn-html');

export function form(type, el) {
	const inputType = inputTypes[type](el);

	return `
		${selectForm(type, el)}

		<form data-type="${formType(el)}" >
			${inputType}
			${stylesField(el)}
			${submitBtn(el)}
		</form>

		${delBtn(el)}
		${HTMLBtn}
	`
}
