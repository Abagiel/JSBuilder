import { CreateBlock } from './Blocks.js';
import { form, fromForm } from './utils.js';

export default class Sidebar {
	constructor(root, update, model) {
		this.root = document.querySelector(root);
		this.update = update;
		this.model = model;

		this.type = 'block';
		this.selectedEl = null;
		this.edit = false;
	}

	init() {
		this.root.addEventListener('change', this.select.bind(this));
		this.root.addEventListener('submit', this.add.bind(this));
		this.root.addEventListener('click', this.remove.bind(this));

		this.renderForm();
	}

	renderForm(edit = false, el = null) {
		this.editMode(edit, el);

		this.root.innerHTML = '';
		this.root.insertAdjacentHTML('beforeend', form(this.type, edit, this.selectedEl));
	}

	editMode(edit, el) {
		if (el) {
			this.type = el.tagName === 'IMG' ? 'img' : 'block';
			this.selectedEl = el;
			this.edit = edit;
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

	remove(e) {
		if (e.target.dataset.type === 'btn-del') {
			this.model.remove(this.selectedEl.dataset.id);
			this.selectedEl.remove();
			this.closeEditForm();
			this.update();
		}
	}

	closeEditForm() {
		this.selectedEl = null;
		this.edit = false;
		this.renderForm();
	}
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

		if (!sb.edit) {
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