# DNI/NIF Validator

[![Build Status](https://travis-ci.org/idirouhab/dni-js-validator.svg?branch=master)](https://travis-ci.org/idirouhab/dni-js-validator)
[![codecov](https://codecov.io/gh/idirouhab/dni-js-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/idirouhab/dni-js-validator)
[![npm version](https://badge.fury.io/js/dni-js-validator.svg)](https://badge.fury.io/js/dni-js-validator)

It's a very small package that sets out to validate Spanish DNI and NIE.
It contains simple functions where the string will be validated against the formula to check whether is valid or not.

# Usage

```
$ npm install dni-js-validator --save 
```

```
var dni = require("dni-js-validator")

dni.isValid('12345678Z') // => 'true'
```