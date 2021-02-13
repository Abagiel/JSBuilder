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
		this.selectedEl = el;
		this.root.innerHTML = '';
		this.root.insertAdjacentHTML('beforeend', form(this.type, edit, this.selectedEl));
	}

	select(e) {
		if (e.target.dataset.type === 'select') {
			this.type = e.target.value;
			this.renderForm();
		}
	}

	add(e) {
		e.preventDefault();
 
		if (this.type === 'img' && !(e.target.dataset.type === 'form-change')) {
			const data = e.target[0].files[0];
			const styles = e.target[1].value;
			const reader = new FileReader();

			reader.onload = (ev) => {
				const newBlock = new CreateBlock('img', ev.target.result, {
					id: Date.now().toString(),
					styles
				});
				this.model.add(newBlock);
				this.update();
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

		if (this.type === 'img' && e.target.dataset.type === 'form-change') {
			const data = e.target[0].files[0] || new Blob();
			const styles = e.target[1].value;
			const reader = new FileReader();

			reader.onload = (ev) => {
				const src = ev.target.result.includes('data:image') ? ev.target.result : this.selectedEl.src;
				const newBlock = new CreateBlock('img', src, {
					id: Date.now().toString(),
					styles
				});
				this.model.replace(newBlock, this.selectedEl.dataset.del);
				this.update()
				this.selectedEl = null;
				this.edit = false;
				this.renderForm();
			}

			reader.readAsDataURL(data);
			return;
		}

		if (e.target.dataset.type === 'form-change') {
			this.model.replace(newBlock, this.selectedEl.dataset.del);
			this.update();
			this.selectedEl = null;
			this.edit = false;
			this.renderForm();
			return;
		}

		this.model.add(newBlock);
		this.update();
		this.renderForm();
	}

	remove(e) {
		if (e.target.dataset.type === 'btn-del') {
			this.model.remove(this.selectedEl.dataset.del);
			this.update();
			this.selectedEl.remove();
			this.edit = false;
			this.selectedEl = null;
			this.renderForm();
		}
	}
}