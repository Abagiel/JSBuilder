import { types } from '../types.js';

function createOption(value, select = '') {
	return `<option value="${value}" ${select} >${value}</option>`
}

function createOptions(type) {
	return Object.values(types).map(t => {
		if (t === type) {
			return createOption(t, 'selected');
		}

		return createOption(t);
	}).join('');
}

export default function selectForm(type, el) {
	const options = createOptions(type);

	return !el 
		? `
		<select data-type="select" >
			${options}
		</select>
	` : '';
}