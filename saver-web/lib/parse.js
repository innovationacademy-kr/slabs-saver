const parseParagraps = (body) => {
	const titles = Array.isArray(body['paragraph-title'])
		? body['paragraph-title']
		: [body['paragraph-title']];
	const contents = Array.isArray(body['paragraph-content'])
		? body['paragraph-content']
		: [body['paragraph-content']];
	const paragraphs = { paragraphs: [] };
	titles.forEach((title, index) => {
		if (title && contents[index]) {
			paragraphs['paragraphs'].push([title, contents[index]]);
		}
	});
	return paragraphs;
};

module.exports = {
	parseParagraps
}
