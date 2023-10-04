export const buildUrlFromParams = (p: {
  route: string;
  params: (string | number)[];
  pattern?: RegExp;
}) => {
  const { route, params, pattern = /:[\w?]+/g } = p;
  let index = 0;

  return route.replace(pattern, str => params[index++]?.toString() ?? str);
};
