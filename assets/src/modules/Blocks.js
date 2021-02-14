import { toCSS } from './utils.js';

class Block {
	constructor(options) {
		this.options = options;
	}

	toHTML() {
	  throw new Error('ERROR!')
	}
}

class SimpleBlock extends Block {
	constructor(options) {
		super(options);
	}

	toHTML() {
		const { content = '', styles, id, tag } = this.options;
		const css = toCSS(styles);

		return `<${tag} 
			data-id="${id}" 
			style="${css}">${content}</${tag}>`
	}
}

class ImgBlock extends Block {
	constructor(options) {
		super({...options, tag: 'img'});
	}

	toHTML() {
		const { styles, alt = '', id, url } = this.options;
		const css = toCSS(styles);

		return `
			<img 
				data-id="${id}" 
				src="${url}"
				alt="${alt}" 
				style="${css}">`
	}
}

export class CreateBlock {
	constructor(type, options) {
		this.options = { ...options, id: Date.now().toString() }
		this.block = type === 'block'
			? new SimpleBlock(this.options)
			: new ImgBlock(this.options);
	}

	toHTML() {
		return this.block.toHTML();
	}
	
}