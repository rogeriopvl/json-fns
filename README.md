# json-fns

[![Build Status](https://travis-ci.org/rogeriopvl/json-fns.svg?branch=master)](https://travis-ci.org/rogeriopvl/json-fns)

## About

json-fns is a JSON parser/stringifier that supports functions and regexp.

json-fns uses the native JSON `parse` and `stringify` methods and extends them to support functions and regular expressions.

## Install

```
npm i json-fns
```

## Usage

### Node

#### Stringify

```javascript
const JSONfns = require('json-fns')

const obj = {
    someFn: function (x) { console.log(x) },
    someRegexp: /foobar/
}

JSONfns.stringify(obj);
```

**Note:** objects serialized by `JSONfns.stringify` can only be restored back completely with `JSONfns.parse`. Using `JSON.parse`, although it works, will result in incomplete/incorrect objects.


#### Parse

```javascript
const JSONfns = require('json-fns')

const serializedObj = '{ "someFn": "function (x) { console.log(x) }" }'

JSONfns.parse(serializedObj)
```

### Browser

Just include it in your html:

    <script type="text/javascript" src="https://unpkg.com/json-fns/json-fns.js">

The `JSONfns` object will be available in your global scope.

AMD is also supported.

## API

- `JSONfns.serialize(obj, space)`
    - `obj`: the object to serialize in JSON format
    - `space`(optional) a String or Number object that's used to insert white space into the output JSON string for readability purposes. This is the exact same parameter passed to `JSON.stringify` ([more info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters))

- `JSONfns.parse(str)`
    - `str`: the serialized object in string format

## Credits

json-fns is an improved fork of [json-fn](https://github.com/vkiryukhin/jsonfn) that seems to be abandoned for some time.

## LICENSE

Please check the [LICENSE](https://github.com/rogeriopvl/json-fns/blob/master/LICENSE) file.
