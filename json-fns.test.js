const test = require('tape')
const sinon = require('sinon')

const JSONfns = require('./')

test('exports stringify and parse', t => {
  t.equal(typeof JSONfns.stringify, 'function')
  t.equal(typeof JSONfns.parse, 'function')
  t.end()
})

test('stringify returns correct json with functions', t => {
  const inputObj = {
    fn: function(x) {
      console.log(x)
    }
  }

  const expected = `{"fn":${JSON.stringify(inputObj.fn.toString())}}`

  const actual = JSONfns.stringify(inputObj)

  t.equal(actual, expected)
  t.end()
})

test('stringify returns correct json with arrow functions', t => {
  const inputObj = {
    fn: x => console.log(x)
  }

  const expected = `{"fn":${JSON.stringify(
    '__ARFn__' + inputObj.fn.toString()
  )}}`

  const actual = JSONfns.stringify(inputObj)

  t.equal(actual, expected)
  t.end()
})

test('stringify returns correct json with regexp', t => {
  const inputObj = {
    regex: /foo/
  }

  const expected = `{"regex":${JSON.stringify(
    '__RGXP__' + inputObj.regex.toString()
  )}}`

  const actual = JSONfns.stringify(inputObj)

  t.equal(actual, expected)
  t.end()
})

test('stringify passes through the space argument', t => {
  sinon.spy(JSON, 'stringify')

  JSONfns.stringify('', 2)

  t.equal(JSON.stringify.calledWith(sinon.match.any, sinon.match.any, 2), true)

  JSON.stringify.restore()
  t.end()
})

test('parse returns correct object with functions', t => {
  const inputStr = `{"fn": ${JSON.stringify(
    function(x) {
      return x * 2
    }.toString()
  )}}`

  const expected = {
    fn: function(x) {
      return x * 2
    }
  }

  const actual = JSONfns.parse(inputStr)

  // since both functions will never be the same because we lose some info like
  // function name, we have to test for behavior instead. It's not the best
  // approach, but works for now
  t.deepEqual(actual.fn(2), expected.fn(2))
  t.end()
})

test('parse returns correct object with arrow functions', t => {
  const inputStr = `{"fn": ${JSON.stringify(
    '__ARFn__' + (x => x * 2).toString()
  )}}`

  const expected = { fn: x => x * 2 }

  const actual = JSONfns.parse(inputStr)

  t.equal(actual.fn(2), expected.fn(2))
  t.end()
})

test('parse returns correct object with regexp', t => {
  const inputStr = `{"regex": ${JSON.stringify(
    '__RGXP__' + /foo/.toString()
  )}}`

  const expected = { regex: /foo/ }

  const actual = JSONfns.parse(inputStr)

  t.deepEqual(actual, expected)
  t.end()
})
