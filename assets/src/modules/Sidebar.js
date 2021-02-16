import { CreateBlock } from './Blocks.js';
import { types, _DEFAULT } from './types.js';
import { fromForm } from './utils.js';
import { form } from './templates/form.js';

export default class Sidebar {
	constructor(root, update, model) {
		this.root = document.querySelector(root);
		this.update = update;
		this.model = model;

		this.type = types[_DEFAULT];
		this.selectedEl = null;
	}

	init() {
		this.root.addEventListener('change', this.select.bind(this));
		this.root.addEventListener('submit', this.add.bind(this));
		this.root.addEventListener('click', this.clickHandler.bind(this));

		this.renderForm();
	}

	renderForm(el = null) {
		this.editMode(el);

		this.root.innerHTML = '';
		this.root.insertAdjacentHTML('beforeend', form(this.type, this.selectedEl));
	}

	editMode(el) {
		if (el) {
			this.type = types[el.tagName];
			this.selectedEl = el;
		}
	}

	select(e) {
		if (e.target.dataset.type === 'select') {
			this.type = e.target.value;
			this.renderForm();
		}
	}

	add(e) {
		e.preventDefault();

		const data = fromForm(e);
		const formType = e.target.dataset.type;
		const newBlock = addSimpleBlock(data, this.type);
 
		if (this.type === 'img') {
			addImgBlock(data, this);
		} else if (formType === 'form-change') {
			this.model.replace(newBlock, this.selectedEl.dataset.id);
			this.closeEditForm();
			this.update();
		} else {
			this.model.add(newBlock);
			this.update();
			this.renderForm();
		}
	}

	clickHandler(e) {
		const type = e.target.dataset.type;

		if (type === 'btn-html') {
			copyHTML(e);
		}

		if (type === 'btn-del') {
			this.model.remove(this.selectedEl.dataset.id);
			this.selectedEl.remove();
			this.closeEditForm();
			this.update();
		}
	}

	closeEditForm() {
		this.selectedEl = null;
		this.renderForm();
	}
}


function copyHTML(e) {
	const html = document.querySelector('#site').innerHTML;

	e.target.textContent = 'Copied!';
	navigator.clipboard.writeText(html);

	setTimeout(() => e.target.textContent = 'Get HTML', 1000);
}

function getImgUrl(e) {
	return e.target.result.includes('data:image') ? true : false;
}

function addSimpleBlock(options, type) {
	return new CreateBlock(type, options);
}

function addImgBlock(options, sb) {
	const file = options.file || new Blob();
	const reader = new FileReader();

	reader.onload = (e) => {
		delete options.file;
		options['url'] = getImgUrl(e) ? e.target.result : sb.selectedEl.src;

		const newBlock = new CreateBlock('img', options);

		if (!sb.selectedEl) {
			sb.model.add(newBlock);
			sb.renderForm();
		} else {
			sb.model.replace(newBlock, sb.selectedEl.dataset.id);
			sb.closeEditForm();
		}

		sb.update();
	}

	reader.readAsDataURL(file);
}