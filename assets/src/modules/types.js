export const IMAGE = 'img';
export const VIDEO = 'video';
export const _DEFAULT = 'block';

const typeByTag = {
	'IMG': IMAGE, 
	'VIDEO': VIDEO,
	'_default': _DEFAULT
}

export const types = new Proxy(typeByTag, {
	get(target, name) {
		if (!target[name]) return target['_default'];

		return target[name];
	}
});