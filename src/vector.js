const {
  apply,
  add,
  paramsToOptions,
  product,
  toDegrees,
} = require('./helpers');

/**
 * Class representing a Vector with Linear Algebra methods.
 */
class Vector {
  /**
   * Constructor of the class
   * @param  { number[] } data Elements for the vector
   */
  constructor(...data) {
    this.fill(data, { inplace: true });
  }

  /**
   * Creates a new instance of a vector from an array
   * @param { number[] } arr Elements for the vector
   * @returns { Vector } Instance of vector
   */
  static fromArray(arr = []) {
    return new Vector(...arr);
  }

  /**
   * Gets the size (number of elements) of the vector
   * @returns { number } Size of the vector
   */
  size() {
    return this.data.length;
  }

  /**
   * Gets the length (magnitude) of the vector
   * @returns { number } Length (magnitude) of the vector
   */
  length() {
    return Math.hypot(...this.data);
  }

  /**
   * Creates a new instance of vector with the same content
   * @returns { Vector } New instance of Vector cloned from this one
   */
  clone() {
    return Vector.fromArray(this.data);
  }

  /**
   * If inplace is true, return this Vector, otherwise returns a clone
   * @param {any} options Options object
   * @returns {Vector} This vector or a clone based on inplace option
   */
  cloneOrInplace(options = {}) {
    return options.inplace ? this : this.clone();
  }

  /**
   * Apply a function over input vectors (at options.vectors).
   * If inplace is true, the result of each iteration of the function
   * will be stored in this vector, otherwise a cloned version
   * will be created.
   * @param {Function} fn
   * @param {any} options Options object, can have inplace and vectors fields.
   * @returns {Vector} Result vector of applying the function.
   */
  apply(fn, options = {}) {
    const result = this.cloneOrInplace(options);
    const vectors = options.vectors
      ? options.vectors.map((x) => (x instanceof Vector ? x.data : x))
      : [];
    const data = [result.data, ...vectors];
    apply(fn, data);
    return result;
  }

  /**
   * Scale a vector by an scalar.
   * If inplace options are provided, modify this vector, otherwise
   * returns a new one.
   * @param {number} k Scalar for the scale
   * @param {any} options Options object.
   * @returns {Vector} Scaled vector, if inplace is true will be this vector,
   *                   otherwise a cloned version.
   */
  scale(k, options) {
    return this.apply((x) => x * k, options);
  }

  fill(n = 0, options = {}) {
    if (n instanceof Vector) {
      return this.fill(n.data, options);
    }
    if (Array.isArray(n)) {
      const vector = options.inplace ? this : new Vector();
      vector.data = [...n];
      return vector;
    }
    return this.apply(() => n, options);
  }

  /**
   * Add (sum) zero to several vectors to this one.
   * If inplace is true, then will mutate this vector, otherwise will
   * return a cloned version.
   * @param  {...any} vectors
   * @returns {Vector} Vector result of this addition. If inplace is true
   *                   will be this vector, otherwise a cloned version.
   */
  add(...vectors) {
    return this.apply(add, paramsToOptions(vectors));
  }

  /**
   * Modifies the length of the vector to a target length.
   * If inplace is ture, will mutate this vector, otherwise will return
   * a cloned version
   * @param {number} tgt Target length for the vector.
   * @param {any} options Options object.
   * @returns {Vector} Vector with new length. If inplace is true, will be
   *                   the source vector mutated, otherwise a clone.
   */
  changeLength(tgt, options) {
    const src = this.length();
    if (src === 0) {
      throw new RangeError(
        'Length of vector is 0, so length can not be modified'
      );
    }
    return this.scale(tgt / src, options);
  }

  /**
   * Normalize a vector to a unit vector.
   * If inplace is true, will mutate this vector, otherwise will return
   * a cloned version
   * @param {any} options Options object.
   * @returns {Vector} Vector length 1. If inplace is true, will be
   *                   the source vector mutated, otherwise a clone.
   */
  normalize(options) {
    return this.changeLength(1, options);
  }

  /**
   * Negate a vector (scale -1).
   * @param {any} options Options object.
   * @returns {Vector} Vector negated. If inplace is true, will be
   *                   the source vector mutated, otherwise a clone.
   */
  negate(options) {
    return this.scale(-1, options);
  }

  /**
   * Calculate a vector where is element is the product of the elements
   * at this position in a set of vectors.
   * @param  {...any} vectors
   * @returns {Vector} Vector product of the others. If inplace is true,
   *                   will be the source vector mutated, otherwise a clone.
   */
  product(...vectors) {
    return this.apply(product, paramsToOptions(vectors));
  }

  /**
   * Calculates the scalar sum of all the elements of this vector.
   * @returns {number} Scalar sum of all elements of this vector.
   */
  sum() {
    return this.data.reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Calculates the dot product of two vectors.
   * @param {Vector|number[]} vector Second vector for the dot product.
   * @returns {number} Dot product of the vectors.
   */
  dotProduct(vector) {
    if (!vector) {
      throw new RangeError(
        'Two vectors are needed for calculating dot product'
      );
    }
    return this.product(vector).sum();
  }

  /**
   * Indicates if two vectors are equal.
   * @param {Vector} vector Vector to compare with.
   * @returns {boolean} True if both vectors are equal, false otherwise.
   */
  equals(vector) {
    if (!vector) {
      return false;
    }
    const data = vector instanceof Vector ? vector.data : vector;
    if (data.length !== this.size()) {
      return false;
    }
    return this.data.every((x, i) => x === data[i]);
  }

  /**
   * Calculates the angle between two vectors, in radians.
   * @param {Vector|number[]} srcVector Source vector or array
   * @returns {number} Radians angle between the two vectors
   */
  angleBetween(srcVector) {
    const vector =
      srcVector instanceof Vector ? srcVector : Vector.fromArray(srcVector);
    return Math.acos(
      this.dotProduct(vector) / (this.length() * vector.length())
    );
  }

  /**
   * Calculates the angle between two vectors, in degrees.
   * @param {Vector|number[]} vector Source vector or array
   * @returns {number} Degrees angle bewtween the two vectors
   */
  angleBetweenDegrees(vector) {
    return toDegrees(this.angleBetween(vector));
  }

  /**
   * Cross Product between two vectors
   * @param {Vector|number[]} vector Source vector or array.
   * @param {any} options Options instance.
   */
  crossProduct(vector, options) {
    if (!vector) {
      throw new Error('Two vectors are needed for cross product');
    }
    const a = this.data;
    const b = vector instanceof Vector ? vector.data : vector;
    if (a.length !== 3 || b.length !== 3) {
      throw new Error('Both vectors must have 3 dimensions');
    }
    return this.fill(
      [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
      ],
      options
    );
  }
}

module.exports = Vector;
