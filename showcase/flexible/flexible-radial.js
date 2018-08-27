// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {FlexibleRadialChart} from 'index';

const RADIAL_PROPS = {
  data: [{angle: 1}, {angle: 5}, {angle: 2}]
};

const defaultProps = {
  margin: {top: 10, left: 10, right: 10, bottom: 10}
};

const FlexibleRadialChartExample = ({height, width}) => (
  <div style={{width: '100%', height: '100%'}}>
    <div className="flexible-radial-chart" style={{width: '30%', height: '100%', border: '1px solid #ccc'}}>
      <FlexibleRadialChart {...RADIAL_PROPS} {...defaultProps} />
    </div>
  </div>
);

export default FlexibleRadialChartExample;
