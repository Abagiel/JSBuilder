import { toCSS } from './utils.js';

class Block {
	constructor(tag, options) {
		this.tag = tag;
		this.options = options;
	}

	toHTML() {
	  throw new Error('ERROR!')
	}
}

export class SimpleBlock extends Block {
	constructor(tag, options) {
		super(tag, options);
	}

	toHTML() {
		const { content = '', styles } = this.options;
		const css = toCSS(styles);

		return `<${this.tag} style="${css}">${content}</${this.tag}>`
	}
}

export class ImgBlock extends Block {
	constructor(url, options) {
		super('img', options);

		this.url = url;
	}

	toHTML() {
		const { styles, alt = '' } = this.options;
		const css = toCSS(styles);

		return `<img src="${this.url}" alt="${alt}" style="${css}">`
	}
}