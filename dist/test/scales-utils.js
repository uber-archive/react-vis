'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

require('babel-polyfill');

var _scalesUtils = require('../lib/utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isScaleConsistent(scaleObject, attr) {
  return scaleObject && scaleObject.range && scaleObject.domain && scaleObject.type && scaleObject.attr === attr;
} // Copyright (c) 2016 Uber Technologies, Inc.
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

var _allData = [[{ x: 1 }, { x: 2 }, { x: 3 }, { x: 2 }]];
var _xValue = 20;
var xRange = [0, 100];
var xDomain = [1, 5];
var xType = 'ordinal';
var xDistance = 10;

(0, _tape2.default)('scales-utils/getScaleObjectFromProps with empty props', function t(assert) {
  var nullResult = (0, _scalesUtils.getScaleObjectFromProps)({}, 'x');
  assert.ok(nullResult === null, 'Should return null if no props available.');
  assert.end();
});

(0, _tape2.default)('scales-utils/getScaleObjectFromProps with empty range', function t(assert) {
  var noRangeResult = (0, _scalesUtils.getScaleObjectFromProps)({ _allData: _allData }, 'x');
  assert.ok(noRangeResult === null, 'Should be null if no range is passed');
  assert.end();
});

(0, _tape2.default)('scales-utils/getScaleObjectFromProps with incomplete props', function t(assert) {
  var incompleteResult = (0, _scalesUtils.getScaleObjectFromProps)({ xRange: xRange, _allData: _allData }, 'x');
  assert.ok(isScaleConsistent(incompleteResult, 'x'), 'Should be a consistent scale');
  assert.ok(incompleteResult.type === 'linear', 'Should be linear by detault');
  assert.end();
});

(0, _tape2.default)('scales-utils/getScaleObjectFromProps with all props', function t(assert) {
  var completeResult = (0, _scalesUtils.getScaleObjectFromProps)({ xRange: xRange, _allData: _allData, xDomain: xDomain, xType: xType, xDistance: xDistance }, 'x');
  assert.ok(isScaleConsistent(completeResult, 'x'), 'Should be a consistent scale');
  assert.ok(completeResult.type === xType, 'Should have same type that was passed by detault');
  assert.end();
});

(0, _tape2.default)('scales-utils/getScaleObjectFromProps should not mutate passed domain', function t(assert) {
  var tXDomain = [1, 5];
  var scaleObj = (0, _scalesUtils.getScaleObjectFromProps)({
    xRange: xRange, _adjustBy: ['x'], _adjustWhat: [0], _allData: _allData,
    xDomain: tXDomain, xDistance: xDistance }, 'x');
  assert.deepEqual(scaleObj.domain, [0.5, 5.5], 'Correct adjustment of domain');
  assert.deepEqual(tXDomain, [1, 5], 'original domain object should contain the same values');
  assert.end();
});

(0, _tape2.default)('scales-utils/getScaleObjectFromProps with the value that overrides props', function t(assert) {
  var valueResult = (0, _scalesUtils.getScaleObjectFromProps)({ x: 10, _allData: _allData }, 'x');
  assert.ok(isScaleConsistent(valueResult, 'x'), 'Should be a consistent scale');
  assert.ok(valueResult.isValue === true, 'Should have isValue = true');
  assert.end();
});

(0, _tape2.default)('scales-utils/getScalePropTypesByAttribute', function t(assert) {
  var result = (0, _scalesUtils.getScalePropTypesByAttribute)('size');
  var isValid = true;
  Object.keys(result).forEach(function (key) {
    isValid &= key.indexOf('_size') === 0 || key.indexOf('size') === 0;
  });
  assert.ok(isValid, 'Should return _size or size values');
  assert.end();
});

(0, _tape2.default)('scales-utils/getAttributeFunctor without props', function t(assert) {
  var result = (0, _scalesUtils.getAttributeFunctor)({ _xValue: _xValue }, 'x');
  assert.ok(result({ x: Math.random() }) === _xValue, 'Fallback value ' + _xValue + ' should be returned by the produced functor');
  assert.end();
});

(0, _tape2.default)('scales-utils/getAttributeFunctor with props', function t(assert) {
  var result = (0, _scalesUtils.getAttributeFunctor)({ xRange: xRange, _allData: _allData }, 'x');
  var isFunction = typeof result === 'function';
  assert.ok(isFunction, 'Result should be a function');
  if (isFunction) {
    assert.ok(result(_allData[0][0]) === xRange[0], 'Function should reflect values properly');
  }
  assert.end();
});

(0, _tape2.default)('scales-utils/getAttributeScale without props', function t(assert) {
  var result = (0, _scalesUtils.getAttributeScale)({}, 'x');
  assert.ok(result === null, 'Result should be null');
  assert.end();
});

(0, _tape2.default)('scales-utils/getAttributeScale with props', function t(assert) {
  var result = (0, _scalesUtils.getAttributeScale)({ xRange: xRange, _allData: _allData }, 'x');
  var isFunction = typeof result === 'function';
  assert.ok(isFunction, 'Result should be a function');
  if (isFunction) {
    assert.ok(result(_allData[0][0].x) === xRange[0], 'Result scale is valid');
  }
  assert.end();
});

(0, _tape2.default)('scales-utils/getAttributeValue without props', function t(assert) {
  var result = (0, _scalesUtils.getAttributeValue)({ _xValue: _xValue }, 'x');
  assert.ok(result === _xValue, 'Fallback value should be returned');
  assert.end();
});

(0, _tape2.default)('scales-utils/getAttributeValue with valid props', function t(assert) {
  var result = (0, _scalesUtils.getAttributeValue)({ x: 10 }, 'x');
  assert.ok(result === 10, 'The value should be returned');
  assert.end();
});

(0, _tape2.default)('scales-utils/_getSmallestDistanceIndex', function t(assert) {
  var scaleObj = {
    type: 'linear',
    domain: [0, 1],
    range: [0, 1]
  };

  assert.equal(runTest([0, 0, 2]), 1);
  assert.equal(runTest([0, 1, 2]), 1);
  assert.equal(runTest([0, 2, 2]), 2);
  assert.equal(runTest([0, 2, 2]), 2);
  assert.equal(runTest([1, 2, 2]), 2);
  assert.equal(runTest([2, 2, 2]), 1);
  assert.end();

  function runTest(arg) {
    return (0, _scalesUtils._getSmallestDistanceIndex)(arg, scaleObj);
  }
});