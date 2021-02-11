import { CreateBlock } from './Blocks.js';

export default class Sidebar {
	constructor(root, updateFn) {
		this.root = document.querySelector(root);
		this.update = updateFn;
	}

	init() {

		this.root.insertAdjacentHTML('beforeend', this.template);
		this.root.addEventListener('click', this.add.bind(this));
	}

	get template() {
		return '<button data-btn="true">Add paragraph</button>'
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