const { Vector } = require('../src');

describe('Vector', () => {
  describe('constructor', () => {
    test('It should create a new instance of vector', () => {
      const vector = new Vector(1, 2, 3);
      expect(vector).toBeDefined();
      expect(vector).toBeInstanceOf(Vector);
      expect(vector.data).toEqual([1, 2, 3]);
    });
    test('If no parameter is provided, create an empty vector', () => {
      const vector = new Vector();
      expect(vector).toBeDefined();
      expect(vector).toBeInstanceOf(Vector);
      expect(vector.data).toEqual([]);
    });
  });

  describe('fromArray', () => {
    test('It should create a new instance of vector from an array input', () => {
      const vector = Vector.fromArray([1, 2, 3]);
      expect(vector).toBeDefined();
      expect(vector).toBeInstanceOf(Vector);
      expect(vector.data).toEqual([1, 2, 3]);
    });
    test('If no array is provided, create an empty vector', () => {
      const vector = Vector.fromArray();
      expect(vector).toBeDefined();
      expect(vector).toBeInstanceOf(Vector);
      expect(vector.data).toEqual([]);
    });
  });

  describe('clone', () => {
    test('It should create a clone of a vector', () => {
      const vectorA = new Vector(1, 2, 3);
      const vectorB = vectorA.clone();
      expect(vectorB).not.toBe(vectorA);
      expect(vectorB).toStrictEqual(vectorA);
    });
  });

  describe('cloneOrInplace', () => {
    test('If inplace option is true, should return the source vector', () => {
      const vectorA = new Vector(1, 2, 3);
      const vectorB = vectorA.cloneOrInplace({ inplace: true });
      expect(vectorB).toBe(vectorA);
    });
    test('If inplace option is false or not defined, should return the a clone of the vector', () => {
      const vectorA = new Vector(1, 2, 3);
      const vectorB = vectorA.cloneOrInplace();
      expect(vectorB).not.toBe(vectorA);
      expect(vectorB).toStrictEqual(vectorA);
    });
  });

  describe('size', () => {
    test('It should return the size of the vector', () => {
      const vector = new Vector(1, 2, 1);
      const actual = vector.size();
      expect(actual).toEqual(3);
    });
  });

  describe('length', () => {
    test('It should return the length (magnitude) of the vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.length();
      expect(actual).toBeCloseTo(Math.sqrt(14));
    });
  });

  describe('scale', () => {
    test('It should return a new vector scaled', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.scale(3);
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(3, 6, 9));
    });
    test('It inplace is true, then mutate input vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.scale(3, { inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(new Vector(3, 6, 9));
    });
  });

  describe('add', () => {
    test('It should return a new vector, sum of this one and the vectors provided', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.add([4, 5, 6], [7, 8, 9]);
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(12, 15, 18));
    });
    test('Vectors and arrays can be mixed', () => {
      const vector = new Vector(1, 2, 3);
      const other = new Vector(7, 8, 9);
      const actual = vector.add([4, 5, 6], other);
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(12, 15, 18));
    });
    test('If inplace option is true, then mutate the original vector', () => {
      const vector = new Vector(1, 2, 3);
      const other = new Vector(7, 8, 9);
      const actual = vector.add([4, 5, 6], other, { inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(new Vector(12, 15, 18));
    });
  });

  describe('changeLength', () => {
    test('It should change the length of the vector to a target length', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.changeLength(2);
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(
        new Vector(0.5345224838248488, 1.0690449676496976, 1.6035674514745464)
      );
    });
    test('If inplace option is true, then mutate the original vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.changeLength(2, { inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(
        new Vector(0.5345224838248488, 1.0690449676496976, 1.6035674514745464)
      );
    });
    test('If length is 0, throw an exception', () => {
      const vector = new Vector(0, 0, 0);
      expect(() => vector.changeLength(2, { inplace: true })).toThrow(
        'Length of vector is 0, so length can not be modified'
      );
    });
  });

  describe('normalize', () => {
    test('It should return an unit vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.normalize();
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(
        new Vector(0.2672612419124244, 0.5345224838248488, 0.8017837257372732)
      );
    });
    test('If inplace option is true, then mutate the original vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.normalize({ inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(
        new Vector(0.2672612419124244, 0.5345224838248488, 0.8017837257372732)
      );
    });
  });

  describe('negate', () => {
    test('It should scale vector by -1', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.negate();
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(-1, -2, -3));
    });
    test('If inplace option is true, then mutate the original vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.negate({ inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(new Vector(-1, -2, -3));
    });
  });

  describe('dotProduct', () => {
    test('It should produce the dotProduct of 2 vectors', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.dotProduct(new Vector(4, 5, 6));
      expect(actual).toEqual(32);
    });
    test('If both vectors does not have the same length, then throw an exception', () => {
      const vector = new Vector(1, 2, 3);
      expect(() => vector.dotProduct([4, 5])).toThrow(
        'All the vectors must have the same length'
      );
    });
    test('It no vector is provided should throw an error', () => {
      const vector = new Vector(1, 2, 3);
      expect(() => vector.dotProduct()).toThrow(
        'Two vectors are needed for calculating dot product'
      );
    });
  });

  describe('fill', () => {
    test('It should return a vector filled with the provided scalar and same number of dimensions', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.fill(7);
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(7, 7, 7));
    });
    test('If inplace option is true, then mutate the original vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.fill(7, { inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(new Vector(7, 7, 7));
    });
    test('If no scalar is provided, fill with zeros', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.fill();
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(0, 0, 0));
    });
    test('A vector can be provided so will be filled with copmonents of this vector', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.fill(new Vector(4, 5, 6));
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(4, 5, 6));
    });
  });

  describe('equals', () => {
    test('If no vector is provided, return false', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.equals();
      expect(actual).toBeFalsy();
    });
    test('If vector has different size, return false', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.equals(new Vector(1, 2, 3, 4));
      expect(actual).toBeFalsy();
    });
    test('If vector is equal, return true', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.equals(new Vector(1, 2, 3));
      expect(actual).toBeTruthy();
    });
    test('If parameter is an array and is equal, return true', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.equals([1, 2, 3]);
      expect(actual).toBeTruthy();
    });
  });

  describe('angleBetween', () => {
    test('It should calculate the angle between two vectors', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.angleBetween(new Vector(4, 5, 6));
      expect(actual).toBeCloseTo(0.2257261285527342);
    });
    test('An array can be provided', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.angleBetween([4, 5, 6]);
      expect(actual).toBeCloseTo(0.2257261285527342);
    });
  });

  describe('angleBetweenDegrees', () => {
    test('It should calculate the angle between two vectors in degrees', () => {
      const vector = new Vector(1, 2, 3);
      const actual = vector.angleBetweenDegrees(new Vector(4, 5, 6));
      expect(actual).toBeCloseTo(12.933154491899135);
    });
  });

  describe('crossProduct', () => {
    test('It should calculate the cross product of two vectors', () => {
      const vector = new Vector(3, -3, 1);
      const actual = vector.crossProduct([4, 9, 2]);
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(-15, -2, 39));
    });
    test('It should calculate the cross product of two vectors when a Vector instance is provided', () => {
      const vector = new Vector(3, -3, 1);
      const actual = vector.crossProduct(new Vector(4, 9, 2));
      expect(actual).not.toBe(vector);
      expect(actual).toStrictEqual(new Vector(-15, -2, 39));
    });
    test('If inplace option is true, then mutate the original vector', () => {
      const vector = new Vector(3, -3, 1);
      const actual = vector.crossProduct([4, 9, 2], { inplace: true });
      expect(actual).toBe(vector);
      expect(actual).toStrictEqual(new Vector(-15, -2, 39));
    });
    test('If the source vector does not have 3D, throw an error', () => {
      const vector = new Vector(3, -3, 1, 5);
      expect(() => vector.crossProduct([4, 9, 2])).toThrow(
        'Both vectors must have 3 dimensions'
      );
    });
    test('If the other vector does not have 3D, throw an error', () => {
      const vector = new Vector(3, -3, 1);
      expect(() => vector.crossProduct([4, 9])).toThrow(
        'Both vectors must have 3 dimensions'
      );
    });
    test('If no vector is provided, throw an error', () => {
      const vector = new Vector(3, -3, 1);
      expect(() => vector.crossProduct()).toThrow(
        'Two vectors are needed for cross product'
      );
    });
  });
});
