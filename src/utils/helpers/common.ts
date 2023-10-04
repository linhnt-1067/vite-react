export const nonNull = <T>(value: T): NonNullable<T> => {
	if (value == null) {
		throw Error('NULL value!');
	}

	return value as NonNullable<T>;
};

export const uniqRandomNumber = () => ~~(Math.random() * new Date().getTime());
