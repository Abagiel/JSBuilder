import Site from './modules/Site.js';
import Sidebar from './modules/Sidebar.js';

import { model } from './modules/model.js';
import '../styles/main.css';


const updateFn = new Site('#site').render(model);
new Sidebar('#sidebar', updateFn).init();