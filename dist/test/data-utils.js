'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

require('babel-polyfill');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _dataUtils = require('../lib/utils/data-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var arr = [{ a: 1 }, { b: 3, a: 2 }, { a: 2 }];

(0, _tape2.default)('data-utils/getObjectValueAccessor', function t(assert) {
  var result = (0, _dataUtils.getObjectValueAccessor)('a');
  assert.ok(result({ a: 1, b: 2 }) === 1, 'Should return value of the property');
  assert.end();
});

(0, _tape2.default)('data-utils/getUniquePropertyValues', function t(assert) {
  var result = (0, _dataUtils.getUniquePropertyValues)(arr, 'a');
  assert.ok(result.length === 2, 'Should return the array of the proper size');
  assert.ok(result.indexOf(1) !== -1 && result.indexOf(2) !== -1, 'Should return unique values of the property');
  assert.end();
});

(0, _tape2.default)('data-utils/isObjectPropertyInUse', function t(assert) {
  var result = (0, _dataUtils.isObjectPropertyInUse)(arr, 'a');
  assert.ok(result, 'Should find the property in use');
  assert.end();
});

(0, _tape2.default)('data-utils/addValueToArray', function t(assert) {
  assert.ok((0, _deepEqual2.default)((0, _dataUtils.addValueToArray)([-10, 10], 1), [-10, 10]), 'Shouldn\'t add the value if the value is in the array');
  assert.ok((0, _deepEqual2.default)((0, _dataUtils.addValueToArray)([-10, 0], 1), [-10, 1]), 'Should add the value if the value is larger');
  assert.ok((0, _deepEqual2.default)((0, _dataUtils.addValueToArray)([0, 10], -1), [-1, 10]), 'Should add the value if the value is smaller');
  assert.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2RhdGEtdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQkE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxJQUFNLE1BQU0sQ0FBQyxFQUFDLEdBQUcsQ0FBSixFQUFELEVBQVMsRUFBQyxHQUFHLENBQUosRUFBTyxHQUFHLENBQVYsRUFBVCxFQUF1QixFQUFDLEdBQUcsQ0FBSixFQUF2QixDQUFaOztBQUVBLG9CQUFLLG1DQUFMLEVBQTBDLFNBQVMsQ0FBVCxDQUFXLE1BQVgsRUFBbUI7QUFDM0QsTUFBTSxTQUFTLHVDQUF1QixHQUF2QixDQUFmO0FBQ0EsU0FBTyxFQUFQLENBQVUsT0FBTyxFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUFQLE1BQXlCLENBQW5DLEVBQXNDLHFDQUF0QztBQUNBLFNBQU8sR0FBUDtBQUNELENBSkQ7O0FBTUEsb0JBQUssb0NBQUwsRUFBMkMsU0FBUyxDQUFULENBQVcsTUFBWCxFQUFtQjtBQUM1RCxNQUFNLFNBQVMsd0NBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLENBQWY7QUFDQSxTQUFPLEVBQVAsQ0FBVSxPQUFPLE1BQVAsS0FBa0IsQ0FBNUIsRUFBK0IsNENBQS9CO0FBQ0EsU0FBTyxFQUFQLENBQ0UsT0FBTyxPQUFQLENBQWUsQ0FBZixNQUFzQixDQUFDLENBQXZCLElBQTRCLE9BQU8sT0FBUCxDQUFlLENBQWYsTUFBc0IsQ0FBQyxDQURyRCxFQUVFLDZDQUZGO0FBR0EsU0FBTyxHQUFQO0FBQ0QsQ0FQRDs7QUFTQSxvQkFBSyxrQ0FBTCxFQUF5QyxTQUFTLENBQVQsQ0FBVyxNQUFYLEVBQW1CO0FBQzFELE1BQU0sU0FBUyxzQ0FBc0IsR0FBdEIsRUFBMkIsR0FBM0IsQ0FBZjtBQUNBLFNBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsaUNBQWxCO0FBQ0EsU0FBTyxHQUFQO0FBQ0QsQ0FKRDs7QUFNQSxvQkFBSyw0QkFBTCxFQUFtQyxTQUFTLENBQVQsQ0FBVyxNQUFYLEVBQW1CO0FBQ3BELFNBQU8sRUFBUCxDQUNFLHlCQUFNLGdDQUFnQixDQUFDLENBQUMsRUFBRixFQUFNLEVBQU4sQ0FBaEIsRUFBMkIsQ0FBM0IsQ0FBTixFQUFxQyxDQUFDLENBQUMsRUFBRixFQUFNLEVBQU4sQ0FBckMsQ0FERixFQUVFLHVEQUZGO0FBR0EsU0FBTyxFQUFQLENBQ0UseUJBQU0sZ0NBQWdCLENBQUMsQ0FBQyxFQUFGLEVBQU0sQ0FBTixDQUFoQixFQUEwQixDQUExQixDQUFOLEVBQW9DLENBQUMsQ0FBQyxFQUFGLEVBQU0sQ0FBTixDQUFwQyxDQURGLEVBRUUsNkNBRkY7QUFHQSxTQUFPLEVBQVAsQ0FDRSx5QkFBTSxnQ0FBZ0IsQ0FBQyxDQUFELEVBQUksRUFBSixDQUFoQixFQUF5QixDQUFDLENBQTFCLENBQU4sRUFBb0MsQ0FBQyxDQUFDLENBQUYsRUFBSyxFQUFMLENBQXBDLENBREYsRUFFRSw4Q0FGRjtBQUdBLFNBQU8sR0FBUDtBQUNELENBWEQiLCJmaWxlIjoiZGF0YS11dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNiBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB0ZXN0IGZyb20gJ3RhcGUnO1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgZXF1YWwgZnJvbSAnZGVlcC1lcXVhbCc7XG5cbmltcG9ydCB7XG4gIGdldE9iamVjdFZhbHVlQWNjZXNzb3IsXG4gIGdldFVuaXF1ZVByb3BlcnR5VmFsdWVzLFxuICBpc09iamVjdFByb3BlcnR5SW5Vc2UsXG4gIGFkZFZhbHVlVG9BcnJheX0gZnJvbSAnLi4vbGliL3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBhcnIgPSBbe2E6IDF9LCB7YjogMywgYTogMn0sIHthOiAyfV07XG5cbnRlc3QoJ2RhdGEtdXRpbHMvZ2V0T2JqZWN0VmFsdWVBY2Nlc3NvcicsIGZ1bmN0aW9uIHQoYXNzZXJ0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IGdldE9iamVjdFZhbHVlQWNjZXNzb3IoJ2EnKTtcbiAgYXNzZXJ0Lm9rKHJlc3VsdCh7YTogMSwgYjogMn0pID09PSAxLCAnU2hvdWxkIHJldHVybiB2YWx1ZSBvZiB0aGUgcHJvcGVydHknKTtcbiAgYXNzZXJ0LmVuZCgpO1xufSk7XG5cbnRlc3QoJ2RhdGEtdXRpbHMvZ2V0VW5pcXVlUHJvcGVydHlWYWx1ZXMnLCBmdW5jdGlvbiB0KGFzc2VydCkge1xuICBjb25zdCByZXN1bHQgPSBnZXRVbmlxdWVQcm9wZXJ0eVZhbHVlcyhhcnIsICdhJyk7XG4gIGFzc2VydC5vayhyZXN1bHQubGVuZ3RoID09PSAyLCAnU2hvdWxkIHJldHVybiB0aGUgYXJyYXkgb2YgdGhlIHByb3BlciBzaXplJyk7XG4gIGFzc2VydC5vayhcbiAgICByZXN1bHQuaW5kZXhPZigxKSAhPT0gLTEgJiYgcmVzdWx0LmluZGV4T2YoMikgIT09IC0xLFxuICAgICdTaG91bGQgcmV0dXJuIHVuaXF1ZSB2YWx1ZXMgb2YgdGhlIHByb3BlcnR5Jyk7XG4gIGFzc2VydC5lbmQoKTtcbn0pO1xuXG50ZXN0KCdkYXRhLXV0aWxzL2lzT2JqZWN0UHJvcGVydHlJblVzZScsIGZ1bmN0aW9uIHQoYXNzZXJ0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IGlzT2JqZWN0UHJvcGVydHlJblVzZShhcnIsICdhJyk7XG4gIGFzc2VydC5vayhyZXN1bHQsICdTaG91bGQgZmluZCB0aGUgcHJvcGVydHkgaW4gdXNlJyk7XG4gIGFzc2VydC5lbmQoKTtcbn0pO1xuXG50ZXN0KCdkYXRhLXV0aWxzL2FkZFZhbHVlVG9BcnJheScsIGZ1bmN0aW9uIHQoYXNzZXJ0KSB7XG4gIGFzc2VydC5vayhcbiAgICBlcXVhbChhZGRWYWx1ZVRvQXJyYXkoWy0xMCwgMTBdLCAxKSwgWy0xMCwgMTBdKSxcbiAgICAnU2hvdWxkblxcJ3QgYWRkIHRoZSB2YWx1ZSBpZiB0aGUgdmFsdWUgaXMgaW4gdGhlIGFycmF5Jyk7XG4gIGFzc2VydC5vayhcbiAgICBlcXVhbChhZGRWYWx1ZVRvQXJyYXkoWy0xMCwgMF0sIDEpLCBbLTEwLCAxXSksXG4gICAgJ1Nob3VsZCBhZGQgdGhlIHZhbHVlIGlmIHRoZSB2YWx1ZSBpcyBsYXJnZXInKTtcbiAgYXNzZXJ0Lm9rKFxuICAgIGVxdWFsKGFkZFZhbHVlVG9BcnJheShbMCwgMTBdLCAtMSksIFstMSwgMTBdKSxcbiAgICAnU2hvdWxkIGFkZCB0aGUgdmFsdWUgaWYgdGhlIHZhbHVlIGlzIHNtYWxsZXInKTtcbiAgYXNzZXJ0LmVuZCgpO1xufSk7XG4iXX0=