import { CreateBlock } from './Blocks.js';
import { form } from './utils.js';

export default class Sidebar {
	constructor(root, updateFn, model) {
		this.root = document.querySelector(root);
		this.update = updateFn;
		this.model = model;

		this.type = 'block';
		this.selectedEl = null;
	}

	init() {
		this.root.addEventListener('change', this.select.bind(this));
		this.root.addEventListener('submit', this.add.bind(this));
		this.root.addEventListener('click', this.remove.bind(this));

		this.renderForm();
	}

	renderForm(edit, el = null) {
		this.root.innerHTML = '';
		this.root.insertAdjacentHTML('beforeend', form(this.type, edit));
		this.selectedEl = el;
	}

	select(e) {
		if (e.target.dataset.type === 'select') {
			this.type = e.target.value;
			this.renderForm();
		}
	}

	add(e) {
		e.preventDefault();
 
		if (this.type === 'img') {
			const data = e.target[0].files[0];
			const styles = e.target[1].value;
			const reader = new FileReader();

			reader.onload = (ev) => {
				const newBlock = new CreateBlock('img', ev.target.result, {
					id: Date.now().toString(),
					styles
				});
				this.update(newBlock);
				this.renderForm();
			}

			reader.readAsDataURL(data);
			return;
		}

		const tag = e.target[0].value;
		const data = e.target[1].value;
		const styles = e.target[2].value;

		const newBlock = new CreateBlock(this.type, tag, {
			content: data,
			id: Date.now().toString(),
			styles
		});

		this.update(newBlock);
		this.renderForm();
	}

	remove(e) {
		if (e.target.dataset.type === 'btn-del') {
			this.model = this.model.filter(({block}) => block.options.id !== this.selectedEl.dataset.del);
			this.selectedEl.remove();

		}
	}
}