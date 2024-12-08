/**
 * @returns {1 | -1}
 */
const sortRandomly = () => {
	if (Math.random() < 0.5) {
		return 1;
	}

	return -1;
};

export {
	sortRandomly,
};
