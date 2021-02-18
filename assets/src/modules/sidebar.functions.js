import { CreateBlock } from './Blocks.js';
import { _DEFAULT, IMAGE, VIDEO } from './types.js';

const handlers = {
	[_DEFAULT](options, sb) {
		const newBlock = new CreateBlock(_DEFAULT, options);

		if (sb.selectedEl) {
			sb.model.replace(newBlock, sb.selectedEl.dataset.id);
			sb.closeEditForm();
		} else {
			sb.model.add(newBlock);
			sb.renderForm();
		}

		sb.update();
	},

	[IMAGE](options, sb) {
		multimedia(options, sb, IMAGE);	
	},

	[VIDEO](options, sb) {
		multimedia(options, sb, VIDEO);
	}
}

const getUrl = (e) => !e.target.result.includes(`data:application`);

function multimedia(options, sb) {
	const file = options.file || new Blob();
	const reader = new FileReader();

	reader.onload = (e) => {
	delete options.file;
	options['url'] = getUrl(e) ? e.target.result : sb.selectedEl.src;

	const newBlock = new CreateBlock(sb.type, options);

	if (!sb.selectedEl) {
		sb.model.add(newBlock);
		sb.renderForm();
	} else {
		sb.model.replace(newBlock, sb.selectedEl.dataset.id);
		sb.closeEditForm();
	}

		sb.update();
	}

	reader.readAsDataURL(file);
}

export default handlers;
