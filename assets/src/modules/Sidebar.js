import { types, _DEFAULT, IMAGE, VIDEO } from './types.js';
import { fromForm, copyHTML } from './utils.js';
import { form } from './templates/form.js';
import handlers from './sidebar.functions.js';

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
		handlers[this.type](data, this);
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