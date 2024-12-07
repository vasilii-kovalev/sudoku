/**
 * @param {InputEvent} event
 */
const handleCellInput = (event) => {
	/** @type {string} */
	const nextValue = event.target.value;
	const inputRegexpResult = /^(?<value>[1-9])/g.exec(nextValue);
	const validValue = inputRegexpResult?.groups?.value;

	// Includes incorrect and empty values.
	if (validValue === undefined) {
		event.target.value = "";
	} else {
		event.target.value = validValue;
	}
};
