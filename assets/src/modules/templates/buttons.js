function createBtn(content, type = 'btn') {
	return `<button data-type="${type}">${content}</button>`
}

export default createBtn;