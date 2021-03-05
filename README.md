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

You provide the ```{ inplace: true}``` to mutate the original vector:

```javascript
const { Vector } = require('@kuotie/vector');

const vector = new Vector(1, 2, 3);
console.log(vector.scale(3, { inplace: true }));
// Vector { data: [ 3, 6, 9 ] }
console.log(vector);
// Vector { data: [ 3, 6, 9 ] }
```
