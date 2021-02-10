export default class Site {
	constructor(root) {
		this.root = document.querySelector(root);
	}

	render(model) {
		model = model;
		model.forEach(el => {
			this.root.insertAdjacentHTML('beforeend', el.toHTML());
		});

		return (data) => {
			model.push(data);
			this.clear();
			this.render(model);
		}
	}

	clear() {
		this.root.innerHTML = '';
	}
}