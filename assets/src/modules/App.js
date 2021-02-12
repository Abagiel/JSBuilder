import Site from './Site.js';
import Sidebar from './Sidebar.js';

import { model } from './model.js';

export default class App {
	constructor() {
		this.site = new Site('#site');
	}

	init() {
		const updateFn = this.site.render(model);
		const sidebar = new Sidebar('#sidebar', updateFn, model);
		sidebar.init();

		this.site.registerDep('sidebar', sidebar);
	}
}