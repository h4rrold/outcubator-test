import { isObject } from './common';

export const setGetParams = (url, params) => {
  if (!url) {
    return null;
  }

  if (!isObject(params)) {
    return null;
  }

  const u = new URL(url);
  Object.keys(params).forEach((key) => u.searchParams.append(key, params[key]));
  return u;
};
