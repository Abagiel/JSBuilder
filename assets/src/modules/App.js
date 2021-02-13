import Site from './Site.js';
import Sidebar from './Sidebar.js';

import { Model } from './model.js';

export default class App {
	constructor() {
		this.model = new Model();
		this.site = new Site('#site', this.model);
	}

	init() {
		this.site.render();

		const sidebar = new Sidebar('#sidebar', this.site.rerender, this.model);
		sidebar.init();

		this.site.registerDep('sidebar', sidebar);
	}
}