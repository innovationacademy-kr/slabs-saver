/**
 *
 * @param {object} obj
 * @param {array} keys
 */
const pick = (obj, keys) => {
	const newObj = {};
	keys.map(key => {
		newObj[key] = obj[key]
	})
	return newObj;
}

module.exports = {
	pick
}