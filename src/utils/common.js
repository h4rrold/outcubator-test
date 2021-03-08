import md5 from 'md5';

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function generateSignature(params, secret) {
  if (!isObject(params)) {
    return null;
  }

  let sortedParams = Object.keys(params)
    .sort()
    .reduce((obj, key) => {
      if (params.hasOwnProperty(key)) {
        obj[key] = params[key];
        return obj;
      }
    }, {});

  let result = Object.entries(sortedParams).reduce((str, curr) => {
    str += curr[0] + '=' + curr[1];
    return str;
  }, '');

  result += secret;

  return md5(result);
}
