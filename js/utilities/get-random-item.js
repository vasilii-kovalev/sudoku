/**
 * @template Item
 * @param {Array<Item>} items
 * @returns {Item}
 */
const getRandomItem = (items) => {
	const normalizedRandomIndex = Math.random() * items.length;
	const randomIndex = Math.floor(normalizedRandomIndex);

	return items[randomIndex];
};

export {
	getRandomItem,
};
