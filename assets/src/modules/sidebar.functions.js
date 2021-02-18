import { CreateBlock } from './Blocks.js';
import { _DEFAULT, IMAGE, VIDEO } from './types.js';


const handlers = {
	[_DEFAULT](options, sb) {
		const newBlock = new CreateBlock(_DEFAULT, options);

		actionModel(sb, options);
	},

	[IMAGE](options, sb) {
		multimedia(options, sb, IMAGE);	
	},

	[VIDEO](options, sb) {
		multimedia(options, sb, VIDEO);
	}
}

const getUrl = (e) => !e.target.result.includes(`data:application`);

function actionModel(sb, options) {
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

function multimedia(options, sb) {
	const file = options.file || new Blob();
	const reader = new FileReader();
	const external = options['url'];

	if (external) {
		action(sb, options);
		return;
	}

	reader.onload = (e) => {
		delete options.file;
		options['url'] = getUrl(e) ? e.target.result : sb.selectedEl.src;
		action(sb, options);
	}

	reader.readAsDataURL(file);
}


export default handlers;
