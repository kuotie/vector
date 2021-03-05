const checkLengths = (data) => {
  if (data.length > 1) {
    const firstLength = data[0].length;
    for (let i = 1; i < data.length; i += 1) {
      if (data[i].length !== firstLength) {
        throw new RangeError('All the vectors must have the same length');
      }
    }
  }
};

/**
 * Apply a function to an array of data, applying it position by position.
 * If a src input is provided, apply the result over this input.
 * Otherwise the results will be applied over ther first element of data.
 * @param {Function} fn Function to be applied
 * @param {any[][]} data Data consisting on an array of arrays.
 * @param {any[] | null} src Array to store the result. If not provided,
 *                             then first element of data will be used.
 * @returns {any[]} Array containing the application of the funciton.
 */
const apply = (fn, data, src) => {
  const result = src || data[0];
  checkLengths(data);
  for (let i = 0; i < result.length; i += 1) {
    result[i] = fn(...data.map((x) => x[i]));
  }
  return result;
};

/**
 * Sum all the parameters provided
 * @param  {...number} elements Parameters to be added.
 * @returns {number} Sum of all parameters
 */
const add = (...elements) => elements.reduce((prev, acc) => prev + acc, 0);

/**
 * Substract all the parameters from the first one.
 * @param  {...number} elements Parameters for the substraction.
 * @returns {number} Substract parameters from the first one.
 */
const substract = (...elements) =>
  elements.slice(1).reduce((prev, acc) => prev - acc, elements[0] || 0);

const product = (...elements) => elements.reduce((prev, acc) => prev * acc, 1);

/**
 * Given parameters, detect if the last one is an options object.
 * Will return an options object with a vectors field containing
 * the parameters that are not already an options object.
 * @param {any[]} params Parameters to convert to options object.
 * @returns {any} Object containing a vectors field with the parameters
 *                that are not an options object (that can be only
 *                the last param)
 */
const paramsToOptions = (params) => {
  if (!params || params.length === 0) {
    return {};
  }
  const lastParam = params[params.length - 1];
  if (lastParam.constructor.name === 'Object') {
    return params.length === 1
      ? { ...lastParam }
      : { vectors: params.slice(0, -1), ...lastParam };
  }
  return { vectors: params };
};

/**
 * Convert radians to degrees
 * @param {number} radians Radians angle
 * @returns {number} Degrees angle
 */
const toDegrees = (radians) => (radians * 180) / Math.PI;

module.exports = { apply, add, substract, product, paramsToOptions, toDegrees };
