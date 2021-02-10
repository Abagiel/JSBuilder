import { SimpleBlock, ImgBlock } from './Blocks.js';
import img1 from '../../resources/1108029.jpg';

export const model = [
	new SimpleBlock('span', {
		content: 'Hello, span-text',
		styles: {
			background: 'hsl(140 50% 50%)',
			color: '#fff'
		}
	}),
	new SimpleBlock('div', {
		styles: {
			background: 'hsl(140 50% 40%)',
			height: '50px',
			width: '50px'
		}
	}),
	new ImgBlock(img1, {
		alt: 'Girl',
		styles: {
			height: 'auto',
			width: '300px'
		}
	})
];