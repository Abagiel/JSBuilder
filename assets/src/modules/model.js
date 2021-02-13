import { CreateBlock } from './Blocks.js';

export class Model {
	constructor() {
		this.data = [];
	}

	add(data) {
		this.data.push(data);
	}

	replace(newData, idx) {
		this.data = this.data
			.map((el) => el.block.options.id === idx ? newData : el);
	}

	remove(idx) {
		this.data = this.data
			.filter(({block}) => block.options.id !== idx);
	}
}