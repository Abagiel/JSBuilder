export default class Site {
	constructor(root, model) {
		this.root = document.querySelector(root);
		this.model = model;

		this.init();
	}

	init() {
		this.root.addEventListener('click', this.editElement.bind(this));
	}

	render() {
		this.model.data.forEach(el => {
			this.root.insertAdjacentHTML('beforeend', el.toHTML());
		});
	}

	rerender = () => {
		this.clear();
		this.render();
	}

	editElement(e) {
		const id = e.target.dataset.id;

		if (id) {
			this.sidebar.renderForm(e.target);
		}
	}

	registerDep(name, dep) {
		this[name] = dep;
	}	

	clear() {
		this.root.innerHTML = '';
	}
}