import Site from './Site.js';
import Sidebar from './Sidebar.js';

import { Model } from './model.js';

export default class App {
	constructor() {
		this.model = new Model();
		this.site = new Site('#site', this.model);
		this.sidebar = new Sidebar('#sidebar', this.site.rerender, this.model);
	}

	init() {
		this.site.render();
		this.site.registerDep('sidebar', this.sidebar);
		this.sidebar.init();
	}
}