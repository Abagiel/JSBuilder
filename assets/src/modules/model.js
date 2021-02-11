import { CreateBlock } from './Blocks.js';
import img1 from '../../resources/1108029.jpg';

export const model = [
	new CreateBlock('block','span', {
		content: 'Hello, span-text',
		styles: {
			background: 'hsl(140 50% 50%)',
			color: '#fff'
		}
	}),
	new CreateBlock('block', 'div', {
		styles: {
			background: 'hsl(140 50% 40%)',
			height: '50px',
			width: '50px'
		}
	}),
	new CreateBlock('img', img1, {
		alt: 'Girl',
		styles: {
			height: 'auto',
			width: '300px'
		}
	})
];