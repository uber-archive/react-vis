import {AbstractSeries, ScaleUtils} from 'react-vis';

import {rgb} from 'd3-color';

const getAttributeFunctor = ScaleUtils.getAttributeFunctor;
const getScaleObjectFromProps = ScaleUtils.getScaleObjectFromProps;

const DEFAULT_OPACITY = 1;

function getScaleDistance(props, attr) {
  const scaleObject = getScaleObjectFromProps(props, attr);
  return scaleObject ? scaleObject.distance : 0;
}

export class HeatmapSeriesCanvas extends AbstractSeries {
  static get requiresSVG() {
    return false;
  }

  static get isCanvas() {
    return true;
  }

  static getParentConfig(attr) {
    const isDomainAdjustmentNeeded = attr === 'x' || attr === 'y';
    return {isDomainAdjustmentNeeded};
  }

  static renderLayer(props, ctx) {
    const {data, marginLeft, marginTop} = props;

    if (!data || data.length === 0) {
      return;
    }

    const xFunctor = getAttributeFunctor(props, 'x');
    const yFunctor = getAttributeFunctor(props, 'y');
    const opacityFunctor = getAttributeFunctor(props, 'opacity');
    const fillFunctor =
      getAttributeFunctor(props, 'fill') || getAttributeFunctor(props, 'color');
    const strokeFunctor =
      getAttributeFunctor(props, 'stroke') ||
      getAttributeFunctor(props, 'color');
    const xDistance = getScaleDistance(props, 'x');
    const yDistance = getScaleDistance(props, 'y');

    data.forEach((d, i) => {
      const fillColor = rgb(fillFunctor(d));
      const strokeColor = rgb(strokeFunctor(d));
      const opacity = opacityFunctor(d) || DEFAULT_OPACITY;

      const x = xFunctor(d) - xDistance / 2;
      const y = yFunctor(d) - yDistance / 2;
      const width = xDistance;
      const height = yDistance;

      ctx.beginPath();
      ctx.rect(x + marginLeft, y + marginTop, width, height);
      ctx.fillStyle = `rgba(${fillColor.r}, ${fillColor.g}, ${
        fillColor.b
      }, ${opacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${
        strokeColor.b
      }, ${opacity})`;
      ctx.stroke();
    });
  }

  render() {
    return null;
  }
}

HeatmapSeriesCanvas.displayName = 'HeatmapSeriesCanvas';
HeatmapSeriesCanvas.defaultProps = {
  ...AbstractSeries.defaultProps,
};

HeatmapSeriesCanvas.propTypes = {
  ...AbstractSeries.propTypes,
};
