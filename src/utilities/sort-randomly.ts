const RANDOM_SORT_THRESHOLD = 0.5;

const sortRandomly = (): 1 | -1 => {
	if (Math.random() < RANDOM_SORT_THRESHOLD) {
		return 1;
	}

	return -1;
};

export { sortRandomly };
