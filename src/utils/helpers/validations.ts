import { ValidationError, ValidateOptions, Schema } from 'yup';

const getValidateErrors = (errors: ValidationError) => {
	const errorInners = errors.inner || [];

	return errorInners.reduce((errorMapper: Record<string, string>, error) => {
		if (error.path && error.message) {
			errorMapper[error.path] = error.message;
		}

		return errorMapper;
	}, {});
};

export const validateWithSchema = async <T>(
	schema: Schema<T>,
	data: T,
	context: ValidateOptions = {},
): Promise<
	| {
			ok: true;
			validatedData: T;
	  }
	| {
			ok: false;
			errors: Record<string, string>;
	  }
> => {
	let errors: Record<string, string> | undefined = undefined;

	await schema
		.validate(data, { abortEarly: false, ...context })
		.catch((err: ValidationError) => {
			errors = getValidateErrors(err);
		});

	if (errors) {
		return {
			ok: false,
			errors,
		};
	}

	return {
		ok: true,
		validatedData: data,
	};
};
