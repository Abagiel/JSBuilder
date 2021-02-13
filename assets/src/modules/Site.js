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

		return (data, type, idx) => {
			if (type === 'mod') {
				this.model = this.model.map((el) => el.block.options.id === idx ? data : el);
			} else if (type === 'del') {
				this.model = this.model.filter(({block}) => block.options.id !== idx);
			} else {
				this.model.push(data);
			}
			console.log(this.model);
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