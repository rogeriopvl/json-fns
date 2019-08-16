const ARROWFN_PREFIX = '__ARFn__';
const REGEXP_PREFIX = '__RGXP__';

const replacer = (key, value) => {
  const fnBody = value.toString();

  if (value instanceof Function || typeof value === 'function') {
    if (fnBody.indexOf('function') !== 0) {
      return ARROWFN_PREFIX + fnBody;
    }

    return fnBody;
  }

  if (value instanceof RegExp) {
    return REGEXP_PREFIX + fnBody;
  }

  return value;
};

const reviver = (key, value) => {
  if (typeof value !== 'string') {
    return value;
  }

  if (value.indexOf('function') === 0) {
    return eval(`(${value})`);
  }

  if (
    value.indexOf(ARROWFN_PREFIX) === 0 ||
    value.indexOf(REGEXP_PREFIX) === 0
  ) {
    return eval(value.slice(8));
  }
};

export default {
  stringify: (obj, space) => JSON.stringify(obj, replacer, space),
  parse: str => JSON.parse(str, reviver)
};
