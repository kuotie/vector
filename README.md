# @kuotie/vector

Vector class with linear algebra methods.
Methods consider the vector as inmutable by default, so when performing operations the vector will not be modified.
If you want a method to mutate the vector, then provide a last parameter with option ```{ inplace: true }```

## Installation

```sh
  npm i @kuotie/vector
```

## Create a vector

You can create a new Vector instance providing the components as parameters:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

You can create a vector from an array:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = Vector.fromArray([1, 2, 3]);
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

## Clone a vector

You can create a clone of a vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
const other = vector.clone();
console.log(other);
// Vector { data: [ 1, 2, 3 ] }
```

## Size of a vector

You can get the size (number of dimensions) of the vector

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.size());
// 3
```


## Length of a vector

You can calculate the lenght (magnitude) of a vector

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.length());
// 3.741657386773941
```

## Scale a vector

You can scale a vector by an scalar.

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.scale(3));
// Vector { data: [ 3, 6, 9 ] }
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

You can provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.scale(3, { inplace: true }));
// Vector { data: [ 3, 6, 9 ] }
console.log(vector);
// Vector { data: [ 3, 6, 9 ] }
```

## Add vectors

You can add one or more vectors by providing the vectors to add or equivalent arrays. It will not mutate the input vector.

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.add(new Vector(4, 5, 6), [7, 8, 9]);
// Vector { data: [ 12, 15, 18 ] }
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

You can provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.add(new Vector(4, 5, 6), [7, 8, 9], { inplace: true });
// Vector { data: [ 12, 15, 18 ] }
console.log(vector);
// Vector { data: [ 12, 15, 18 ] }
```

## Change Length

You can change the length of a vector, this will generates a new vector and will not mutate the input vector.

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.changeLength(2));
// Vector { data: [ 0.5345224838248488, 1.0690449676496976, 1.6035674514745464 ] }
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

You can provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.changeLength(2, { inplace: true }));
// Vector { data: [ 0.5345224838248488, 1.0690449676496976, 1.6035674514745464 ] }
console.log(vector);
// Vector { data: [ 0.5345224838248488, 1.0690449676496976, 1.6035674514745464 ] }
```

## Normalize

This will return a Unit Vector from this one:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.normalize());
// Vector { data: [ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732 ] }
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

You can provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.normalize({ inplace: true }));
// Vector { data: [ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732 ] }
console.log(vector);
// Vector { data: [ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732 ] }
```

## Negate

This will return a nage version of the vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.negate());
// Vector { data: [ -1, -2, -3 ] }
console.log(vector);
// Vector { data: [ 1, 2, 3 ] }
```

You can provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.normalize({ inplace: true }));
// Vector { data: [ -1, -2, -3 ] }
console.log(vector);
// Vector { data: [ -1, -2, -3 ] }
```

## Dot Product

It should calculate the dot product of two vectors

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.dotProduct(new Vector(4, 5, 6)));
// 32
```

An array can be provided instead of a vector

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.dotProduct([4, 5, 6]));
// 32
```

## Equals

Indicates if this vector equals another one:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.equals(new Vector(1, 2, 3)));
// true
console.log(vector.equals(new Vector(1, 2, 5)));
// false
```

An array can be provided instead of a vector

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.equals([1, 2, 3]));
// true
console.log(vector.equals([1, 2, 5])));
// false
```

## Angle between two vectors

It will calculate the angle between two vectors, in radians

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.angleBetween(new Vector(4, 5, 6)));
// 0.2257261285527342
```

An array can be provided instead of a vector

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.angleBetween([4, 5, 6]));
// 0.2257261285527342
```

A version for degrees also exists:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.angleBetweenDegrees(new Vector(4, 5, 6)));
// 12.933154491899135
```

## Cross Product

It can calculate the cross product of two vectors. It will not mutate the vector.

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(3, -3, 1);
console.log(vector.crosProduct(new Vector(4, 9, 2)));
// Vector { data: [ -15, -2, 39 ] }
console.log(vector);
// Vector { data: [ 3, -3, 1 ] }

```

You can provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(3, -3, 1);
console.log(vector.crosProduct(new Vector(4, 9, 2)));
// Vector { data: [ -15, -2, 39 ] }
console.log(vector);
// Vector { data: [ -15, -2, 39 ] }
```
