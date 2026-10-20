const getRandomItem = <Item>(items: Array<Item>): Item => {
	if (items.length === 0) {
		throw new Error("Cannot choose a random item from an empty array.");
	}

	const normalizedRandomIndex = Math.random() * items.length;
	const randomIndex = Math.floor(normalizedRandomIndex);

	return items[randomIndex];
};

export {
	getRandomItem,
};
