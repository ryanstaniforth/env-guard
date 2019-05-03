# ENV Guard

`env-guard` is built in TypeScript and provides simple methods for validating and exporting
environment variables.

`env-guard` supports the idea that **all** environment config should be validated at application
boot (or build time for React etc) and should exit immediately if validation fails. And that config
should then only be exported and accessed from one location.

## Install

```bash
npm install --save env-guard
```

> Type definitions are bundled and do not require a separate install.

## Usage

```typescript
// config.js

import { getStringEnv, getNumberEnv, getBooleanEnv } from 'env-guard';

// Get a string value.
export const STRING_EXAMPLE_1 = getStringEnv('STRING_EXAMPLE_1');
// Get a string value with a set of possibilities.
export const STRING_EXAMPLE_2 = getStringEnv('STRING_EXAMPLE_2', ['these', 'are', 'valid']);

// Get a number value.
export const NUMBER_EXAMPLE_1 = getNumberEnv('NUMBER_EXAMPLE_1');
// Get a number value with a set of possibilities.
export const NUMBER_EXAMPLE_2 = getNumberEnv('NUMBER_EXAMPLE_2', [1, 2, 3]);

// Get a boolean value
export const BOOLEAN_EXAMPLE = getBooleanEnv('BOOLEAN_EXAMPLE');

// If any value does not pass validation, one of the following errors will be thrown.

// EnvMissing
// EnvInvalidType
// EnvInvalidPossibility

console.log([
    STRING_EXAMPLE_1,
    STRING_EXAMPLE_2,
    NUMBER_EXAMPLE_1,
    NUMBER_EXAMPLE_2,
    BOOLEAN_EXAMPLE,
]);
```

If we attempt to run the application, it will exit at the first validation failure.

```bash
$ node ./config.js
Error: Envionment variable [STRING_EXAMPLE_1] is not set.
```

Passing all the required variables will allow the application to run.

```bash
$ STRING_EXAMPLE_1=a STRING_EXAMPLE_2=valid NUMBER_EXAMPLE_1=1 NUMBER_EXAMPLE_2=3 BOOLEAN_EXAMPLE=true node ./config.js
[ 'a', 'valid', 1, 3, true ]
```
