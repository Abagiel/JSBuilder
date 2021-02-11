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

class SimpleBlock extends Block {
	constructor(tag, options) {
		super(tag, options);
	}

	toHTML() {
		const { content = '', styles, id = '' } = this.options;
		const css = toCSS(styles);

		return `<${this.tag} 
			data-del="${id}" 
			style="${css}">${content}</${this.tag}>`
	}
}

class ImgBlock extends Block {
	constructor(url, options) {
		super('img', options);

		this.url = url;
	}

	toHTML() {
		const { styles, alt = '', id = '' } = this.options;
		const css = toCSS(styles);

		return `
			<img 
				data-del="${id}" 
				src="${this.url}"
				alt="${alt}" 
				style="${css}">`
	}
}

export class CreateBlock {
	constructor(type, data, options) {
		this.block = type === 'block'
			? new SimpleBlock(data, options)
			: new ImgBlock(data, options);
	}

	toHTML() {
		return this.block.toHTML();
	}
	
}