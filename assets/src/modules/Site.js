export default class Site {
	constructor(root) {
		this.root = document.querySelector(root);

		this.init();
	}

	init() {
		this.root.addEventListener('click', this.removeElement.bind(this));
	}

	render(model) {
		this.model = model;
		this.model.forEach(el => {
			this.root.insertAdjacentHTML('beforeend', el.toHTML());
		});

		return (data) => {
			this.model.push(data);
			this.clear();
			this.render(this.model);
		}
	}

	removeElement(e) {
		const el = e.target;
		const id = el.dataset.del;

		if (id) {
			this.model = this.model
			  .filter(({block}) => block.options.id !== id);
			el.remove();
		}
	}

	clear() {
		this.root.innerHTML = '';
	}
}