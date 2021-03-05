const { apply, add, substract, paramsToOptions } = require('../src/helpers');

describe('Helpers', () => {
  describe('apply', () => {
    test('It should apply a function based on information of several arrays', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const result = apply(add, data);
      expect(result).toEqual([12, 15, 18]);
    });
  });

  describe('paramsToOptions', () => {
    test('It should convert parameters to an options object', () => {
      const input = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const actual = paramsToOptions(input);
      expect(actual).toStrictEqual({
        vectors: input,
      });
    });
    test('If no parameters are provided, return an options object without vectors', () => {
      const actual = paramsToOptions();
      expect(actual).toStrictEqual({});
    });
    test('If the only parameters is an options object, return it but no vectors', () => {
      const actual = paramsToOptions([{ inplace: true }]);
      expect(actual).toStrictEqual({ inplace: true });
    });
    test('If the last parameter is an options object, use this as template for result', () => {
      const input = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const actual = paramsToOptions([...input, { inplace: true }]);
      expect(actual).toStrictEqual({
        vectors: input,
        inplace: true,
      });
    });
  });

  describe('add', () => {
    test('If should add the parameters', () => {
      const actual = add(1, 2, 3);
      expect(actual).toEqual(6);
    });
    test('If there is only one parameter, the add should equal this parameter', () => {
      const actual = add(3);
      expect(actual).toEqual(3);
    });
    test('If there is no parameter, the add should equal 0', () => {
      const actual = add();
      expect(actual).toEqual(0);
    });
  });

  describe('substract', () => {
    test('If should subtract the parameters from the first one', () => {
      const actual = substract(1, 2, 3);
      expect(actual).toEqual(-4);
    });
    test('If there is only one parameter, return this one', () => {
      const actual = substract(3);
      expect(actual).toEqual(3);
    });
    test('If there is no parameter, return 0', () => {
      const actual = substract();
      expect(actual).toEqual(0);
    });
  });
});
