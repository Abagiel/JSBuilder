export default class Site {
	constructor(root) {
		this.root = document.querySelector(root);

		this.init();
	}

	init() {
		this.root.addEventListener('click', this.editElement.bind(this));
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

	editElement(e) {
		const el = e.target;
		const id = el.dataset.del;

		if (id) {
			this.sidebar.renderForm(true, el);
		}
	}

	registerDep(name, dep) {
		this[name] = dep;
	}	

	clear() {
		this.root.innerHTML = '';
	}
}