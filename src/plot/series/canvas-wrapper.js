// Copyright (c) 2017 Uber Technologies, Inc.
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

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {interpolate} from 'd3-interpolate';
import {extractAnimatedPropValues} from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';

const MAX_DRAWS = 30;

/**
 * Draw loop draws each of the layers until it should draw more
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 */
function engageDrawLoop(ctx, height, width, layers) {
  let drawIteration = 0;
  const drawCycle = setInterval(() => {
    drawLayers(ctx, height, width, layers, drawIteration);
    if (drawIteration > MAX_DRAWS) {
      clearInterval(drawCycle);
    }
    drawIteration += 1;
  }, 1);
}

/**
 * Determine whether the children for the wrapper at this point require animation
 * @param {Object} children the children to be checked.
 * @returns {Boolean} whether or not to animate
 */
function checkChildrenForAnimation(children) {
  return children.reduce((any, child) => {
    if (any) {
      return any;
    }
    return child.props.animation;
  }, false);
}

/**
 * Loops across each of the layers to be drawn and draws them
 * @param {CanvasContext} ctx - the context where the drawing will take place
 * @param {Number} height - height of the canvas
 * @param {Number} width - width of the canvas
 * @param {Array} layers - the layer objects to render
 * @param {Number} drawIteration - width of the canvas
 */
function drawLayers(ctx, height, width, layers, drawIteration) {
  ctx.clearRect(0, 0, width, height);
  layers.forEach(layer => {
    const {interpolator, newProps, animation} = layer;
    // return an empty object if dont need to be animating
    const interpolatedProps = animation ?
      (interpolator ? interpolator(drawIteration / MAX_DRAWS) : interpolator) :
      () => ({});
    layer.renderLayer({
      ...newProps,
      ...interpolatedProps
    }, ctx);
  });
}

/**
 * Build an array of layer of objects the contain the method for drawing each series
 * as well as an interpolar (specifically a d3-interpolate interpolator)
 * @param {Object} newChildren the new children to be rendered.
 * @param {Object} oldChildren the old children to be rendered.
 * @returns {Array} Object for rendering
 */
function buildLayers(newChildren, oldChildren) {
  return newChildren.map((child, index) => {
    const oldProps = oldChildren[index] ? oldChildren[index].props : {};
    const newProps = child.props;

    const oldAnimatedProps = extractAnimatedPropValues({
      ...oldProps,
      animatedProps: ANIMATED_SERIES_PROPS
    });
    const newAnimatedProps = newProps ? extractAnimatedPropValues({
      ...newProps,
      animatedProps: ANIMATED_SERIES_PROPS
    }) : null;
    const interpolator = interpolate(oldAnimatedProps, newAnimatedProps);

    return {
      renderLayer: child.type.renderLayer,
      newProps: child.props,
      animation: child.props.animation,
      interpolator
    };
  });
}
class CanvasWrapper extends Component {
  componentDidMount() {
    this.drawChildren(this.props, null, this.refs.canvas.getContext('2d'));
  }

  componentWillUpdate(nextProps) {
    this.drawChildren(nextProps, this.props, this.refs.canvas.getContext('2d'));
  }

  drawChildren(newProps, oldProps, ctx) {
    const {
      children,
      innerHeight,
      innerWidth,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop
    } = newProps;
    if (!ctx) {
      return;
    }

    const childrenShouldAnimate = checkChildrenForAnimation(children);

    const height = innerHeight + marginTop + marginBottom;
    const width = innerWidth + marginLeft + marginRight;
    const layers = buildLayers(newProps.children, oldProps ? oldProps.children : []);
    // if we don't need to be animating, dont! cut short
    if (!childrenShouldAnimate) {
      drawLayers(ctx, height, width, layers);
      return;
    }

    engageDrawLoop(ctx, height, width, layers);
  }

  render() {
    const {
      children,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      innerHeight,
      innerWidth
    } = this.props;

    return (
      <div style={{left: 0, top: 0}} className="rv-xy-canvas">
        <canvas
          className="rv-xy-canvas-element"
          height={innerHeight + marginTop + marginBottom}
          width={innerWidth + marginLeft + marginRight}
          ref="canvas" />
        {children}
      </div>
    );
  }
}

CanvasWrapper.displayName = 'CanvasWrapper';
CanvasWrapper.propTypes = {
  marginBottom: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  marginRight: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired
};

export default CanvasWrapper;
