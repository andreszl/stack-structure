export const timestamp = () => {
	const date: any = new Date();
	return Math.floor(date / 1000);
};

export const date = () => new Date();
