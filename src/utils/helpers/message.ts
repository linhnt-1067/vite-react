import i18next from '@/locales/i18n';

export const createMessageWithParams = (p: {
	translationPath: string;
	params: string[];
	pattern?: string;
}) => {
	const { translationPath, params, pattern = '${keyword}' } = p;

	return params.reduce(
		(message: string, param: string) => message.replace(pattern, param),
		i18next.t(translationPath as any),
	);
};
