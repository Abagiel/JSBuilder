export function createInput(value, type, dataset, req, ext = '') {
	const required = req ? 'required' : '';

	return `<input 
		accept="${ext}"
		value="${value}" 
		type="${type}"
		data-type="${dataset}" 
		placeholder="${dataset}"
		${required} />`
}

export function stylesField(value) {
	const styles = value ? value.getAttribute('style') : '';

	return `<textarea data-type="styles" placeholder="styles">${styles}</textarea>`
}