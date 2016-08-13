'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2016 Uber Technologies, Inc.
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

var Example = function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example(props) {
    _classCallCheck(this, Example);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Example).call(this, props));

    _this.state = {
      selectedIndex: null
    };
    _this._onChartMouseLeave = _this._onChartMouseLeave.bind(_this);
    _this._onSeriesMouseOvers = [_this._onSeriesMouseOver.bind(_this, 0), _this._onSeriesMouseOver.bind(_this, 1)];
    return _this;
  }

  _createClass(Example, [{
    key: '_onSeriesMouseOver',
    value: function _onSeriesMouseOver(selectedIndex) {
      this.setState({ selectedIndex: selectedIndex });
    }
  }, {
    key: '_onChartMouseLeave',
    value: function _onChartMouseLeave() {
      this.setState({ selectedIndex: null });
    }
  }, {
    key: '_getSeriesColor',
    value: function _getSeriesColor(index) {
      var selectedIndex = this.state.selectedIndex;

      if (selectedIndex !== null && selectedIndex !== index) {
        return '#ddd';
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _.XYPlot,
          {
            onMouseLeave: this._onChartMouseLeave,
            width: 300,
            height: 150 },
          _react2.default.createElement(_.VerticalGridLines, null),
          _react2.default.createElement(_.HorizontalGridLines, null),
          _react2.default.createElement(_.XAxis, null),
          _react2.default.createElement(_.YAxis, null),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(0),
            onSeriesMouseOver: this._onSeriesMouseOvers[0],
            data: [{ x: 1, y: 15 }, { x: 2, y: 8 }, { x: 3, y: 1 }] }),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(1),
            onSeriesMouseOver: this._onSeriesMouseOvers[1],
            data: [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }] })
        ),
        _react2.default.createElement(
          _.XYPlot,
          {
            onMouseLeave: this._onChartMouseLeave,
            width: 300,
            height: 150 },
          _react2.default.createElement(_.VerticalGridLines, null),
          _react2.default.createElement(_.HorizontalGridLines, null),
          _react2.default.createElement(_.XAxis, null),
          _react2.default.createElement(_.YAxis, null),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(0),
            onSeriesMouseOver: this._onSeriesMouseOvers[0],
            data: [{ x: 1, y: 4 }, { x: 2, y: 11 }, { x: 3, y: 9 }] }),
          _react2.default.createElement(_.LineSeries, {
            color: this._getSeriesColor(1),
            onSeriesMouseOver: this._onSeriesMouseOvers[1],
            data: [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 11 }] })
        )
      );
    }
  }]);

  return Example;
}(_react2.default.Component);

exports.default = Example;