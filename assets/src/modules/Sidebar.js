import { CreateBlock } from './Blocks.js';
import { form, inputForm } from './utils.js';

export default class Sidebar {
	constructor(root, updateFn) {
		this.root = document.querySelector(root);
		this.update = updateFn;
		this.type = 'block';
	}

	init() {
		this.root.insertAdjacentHTML('beforeend', form(this.type));
		this.root.addEventListener('change', this.select.bind(this));
		this.root.addEventListener('click', this.add.bind(this));
	}

	select(e) {
		const el = e.target;

		if (el.dataset.type === 'file') {
			const reader = new FileReader();
			reader.onload = (ev) => {
				const newBlock = new CreateBlock('img', ev.target.result, {
					id: Date.now().toString(),
					styles: {
						height: 'auto',
						width: '400px'
					}
				});
				this.update(newBlock);
			}
			reader.readAsDataURL(e.target.files[0]);
			return;
		}
		if (el.dataset.type === 'select') {
			this.type = e.target.value;
		}

		this.root.innerHTML = '';
		this.root.insertAdjacentHTML('beforeend', form(this.type));
		this.root.insertAdjacentHTML('beforeend', inputForm(this.type));
	}

	add(e) {
		if (!e.target.dataset.btn) return;

		const newBlock = new CreateBlock('block', 'p', {
			id: Date.now().toString(),
			styles: {
				background: 'tomato',
				height: '20px',
				width: '50px'
			}
		});

		this.update(newBlock);
	}
}