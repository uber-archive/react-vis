// Copyright (c) 2016 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import test from 'tape';
import {
  getScaleObjectFromProps,
  getScalePropTypesByAttribute,
  getAttributeFunctor,
  getAttributeScale,
  getAttributeValue,
  getFontColorFromBackground,
  _getSmallestDistanceIndex,
  extractScalePropsFromProps,
  getMissingScaleProps,
  literalScale
} from 'utils/scales-utils';

const isScaleConsistent = (scaleObject, attr) => {
  return scaleObject && scaleObject.range && scaleObject.domain &&
    scaleObject.type && scaleObject.attr === attr;
};

const _allData = [[{x: 1}, {x: 2}, {x: 3}, {x: 2}]];
const _xValue = 20;
const xRange = [0, 100];
const xDomain = [1, 5];
const xType = 'ordinal';
const xDistance = 10;

test('scales-utils/getScaleObjectFromProps with empty props', assert => {
  const nullResult = getScaleObjectFromProps({}, 'x');
  assert.ok(nullResult === null, 'Should return null if no props available.');
  assert.end();
});

test('scales-utils/getScaleObjectFromProps with empty domain', assert => {
  const noRangeResult = getScaleObjectFromProps({xDomain}, 'x');
  assert.ok(noRangeResult === null, 'Should be null if no domain is passed');
  assert.end();
});

test('scales-utils/getScaleObjectFromProps with empty range', assert => {
  const noDomainResult = getScaleObjectFromProps({xRange}, 'x');
  assert.ok(noDomainResult === null, 'Should be null if no range is passed');
  assert.end();
});

test('scales-utils/getScaleObjectFromProps with all props', assert => {
  const completeResult = getScaleObjectFromProps(
    {xRange, _allData, xDomain, xType, xDistance},
    'x'
  );

  assert.ok(isScaleConsistent(completeResult, 'x'),
    'Should be a consistent scale');
  assert.ok(completeResult.type === xType,
    'Should have same type that was passed by detault');
  assert.end();
});

test('scales-utils/getScaleObjectFromProps does not mutate passed domain', assert => {
  const tXDomain = [1, 5];
  const scaleObj = getScaleObjectFromProps({
    xRange, _adjustBy: ['x'], _adjustWhat: [0], _allData,
    xDomain: tXDomain, xDistance
  }, 'x');

  assert.deepEqual(scaleObj.domain, [0.5, 5.5], 'Correct adjustment of domain');
  assert.deepEqual(tXDomain, [1, 5], 'original domain object should contain the same values');
  assert.end();
});

test('scales-utils/getScaleObjectFromProps with the value that overrides props', assert => {
  const valueResult = getScaleObjectFromProps({x: 10, _allData}, 'x');
  assert.ok(isScaleConsistent(valueResult, 'x'),
    'Should be a consistent scale');
  assert.ok(valueResult.isValue === true,
    'Should have isValue = true');
  assert.end();
});

test('scales-utils/getScalePropTypesByAttribute', assert => {
  const result = getScalePropTypesByAttribute('size');
  let isValid = true;
  Object.keys(result).forEach(key => {
    isValid &= key.indexOf('_size') === 0 || key.indexOf('size') === 0;
  });
  assert.ok(isValid, 'Should return _size or size values');
  assert.end();
});

test('scales-utils/getAttributeFunctor without props', assert => {
  const result = getAttributeFunctor({_xValue}, 'x');
  assert.ok(
    result({x: Math.random()}) === _xValue,
    `Fallback value ${_xValue} should be returned by the produced functor`
  );
  assert.end();
});

test('scales-utils/getAttributeFunctor with props', assert => {
  const result = getAttributeFunctor({xRange, xDomain}, 'x');
  const isFunction = typeof result === 'function';
  assert.ok(isFunction, 'Result should be a function');
  if (isFunction) {
    assert.ok(
      result(_allData[0][0]) === xRange[0],
      'Function should reflect values properly'
    );
  }
  assert.end();
});

test('scales-utils/getAttributeScale without props', assert => {
  const result = getAttributeScale({}, 'x');
  assert.ok(result === null, 'Result should be null');
  assert.end();
});

test('scales-utils/getAttributeScale with props', assert => {
  const result = getAttributeScale({xRange, xDomain}, 'x');
  const isFunction = typeof result === 'function';
  assert.ok(isFunction, 'Result should be a function');
  if (isFunction) {
    assert.ok(result(_allData[0][0].x) === xRange[0], 'Result scale is valid');
  }
  assert.end();
});

test('scales-utils/getAttributeValue without props', assert => {
  const result = getAttributeValue({_xValue}, 'x');
  assert.ok(result === _xValue, 'Fallback value should be returned');
  assert.end();
});

test('scales-utils/getAttributeValue with valid props', assert => {
  const result = getAttributeValue({x: 10}, 'x');
  assert.ok(result === 10, 'The value should be returned');
  assert.end();
});

test('scales-utils/_getSmallestDistanceIndex', assert => {

  const scaleObj = {
    type: 'linear',
    domain: [0, 1],
    range: [0, 1]
  };

  const runTest = arg => _getSmallestDistanceIndex(arg, scaleObj);

  assert.equal(runTest([0, 0, 2]), 1);
  assert.equal(runTest([0, 1, 2]), 1);
  assert.equal(runTest([0, 2, 2]), 2);
  assert.equal(runTest([0, 2, 2]), 2);
  assert.equal(runTest([1, 2, 2]), 2);
  assert.equal(runTest([2, 2, 2]), 1);
  assert.end();

});

test('scales-utils/extractScalePropsFromProps', assert => {

  assert.ok(
    Object.keys(extractScalePropsFromProps({}, [])).length === 0,
    'Should return empty object on empty values'
  );

  const props = {
    aType: 'linear',
    aRange: [1, 2],
    _aValue: 10,
    somethingElse: [],
    bDomain: [1, 2, 3]
  };

  const result = extractScalePropsFromProps(props, ['a', 'b']);

  assert.ok(Object.keys(result).length === 4 && result.aType === props.aType &&
    result.aRange === props.aRange && result._aValue === props._aValue &&
    result.bDomain === props.bDomain,
    'Should return valid object');
  assert.end();
});

test('scales-utils/getMissingScaleProps', assert => {
  assert.ok(Object.keys(getMissingScaleProps({}, [], [])).length === 0,
    'Should return empty result on empty arguments');
  const result = getMissingScaleProps({}, _allData[0], ['x']);
  assert.ok(Boolean(result.xDomain) && result.xDomain.length === 2 &&
    result.xDomain[0] === 1 && result.xDomain[1] === 3,
    'Should return a valid object');
  assert.end();
});

test('scale-utils/literalScale', assert => {
  const s = literalScale();

  assert.equal(s(0.5), 0.5, 'acts as the identity');
  assert.equal(s(1), 1, 'acts as the identity');
  assert.equal(s(1.5), 1.5, 'acts as the identity');
  assert.equal(s(2), 2, 'acts as the identity');
  assert.equal(s(2.5), 2.5, 'acts as the identity');

  assert.equal(s('2'), '2', 'does NOT coerce input to a number');

  assert.end();
});

test('scale-utils/getFontColorFromBackground', assert => {
  assert.equal(getFontColorFromBackground('#fff'), '#222', 'should find correct color');
  assert.equal(getFontColorFromBackground('#000'), '#fff', 'should find correct color');
  assert.equal(getFontColorFromBackground(null), null, 'sensible default');

  assert.end();
});
