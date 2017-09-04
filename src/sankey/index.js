import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  sankey,
  sankeyLinkHorizontal,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify
} from 'd3-sankey';
import XYPlot from 'plot/xy-plot';

import VerticalRectSeries from 'plot/series/vertical-rect-series';
import LabelSeries from 'plot/series/label-series';
import Voronoi from 'plot/voronoi';
import {DISCRETE_COLOR_RANGE} from 'theme';

import SankeyLink from './sankey-link';
const NOOP = f => f;

const ALIGNMENTS = {
  justify: sankeyJustify,
  center: sankeyCenter,
  left: sankeyLeft,
  right: sankeyRight
};

class Sankey extends Component {
  render() {

    const {
      align,
      animation,
      className,
      hasVoronoi,
      height,
      hideLabels,
      layout,
      links,
      linkOpacity,
      margin,
      nodePadding,
      nodes,
      nodeWidth,
      onValueClick,
      onValueMouseOver,
      onValueMouseOut,
      style,
      width
    } = this.props;
    const nodesCopy = [...new Array(nodes.length)].map((e, i) => ({...nodes[i]}));
    const linksCopy = [...new Array(links.length)].map((e, i) => ({...links[i]}));

    const formattedMargin = {
      left: typeof margin === 'object' ? margin.left || 0 : margin,
      right: typeof margin === 'object' ? margin.right || 0 : margin,
      bottom: typeof margin === 'object' ? margin.bottom || 0 : margin,
      top: typeof margin === 'object' ? margin.tom || 0 : margin
    };

    const sankeyInstance = sankey()
      .extent([
        [formattedMargin.left, formattedMargin.top],
        [width - formattedMargin.right, height - formattedMargin.bottom - formattedMargin.top]
      ])
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodes(nodesCopy)
      .links(linksCopy)
      .nodeAlign(ALIGNMENTS[align])
      .iterations(layout);
    sankeyInstance(nodesCopy);

    const nWidth = sankeyInstance.nodeWidth();
    const path = sankeyLinkHorizontal();

    return (
      <XYPlot
        {...this.props}
        yType="literal"
        className={`rv-sankey ${className}`}>
        {linksCopy.map((link, i) => (
          <SankeyLink
            style={style.links}
            data={path(link)}
            opacity={link.opacity || linkOpacity}
            color={link.color}

            strokeWidth={Math.max(link.width, 1)}
            node={link}
            nWidth={nWidth}
            key={`link-${i}`}/>
        ))
        }
        {
          <VerticalRectSeries
            animation={animation}
            className={`${className} rv-sankey__node`}
            data={nodesCopy.map(node => {
              return {
                ...node,
                y: node.y1 - formattedMargin.top,
                y0: node.y0 - formattedMargin.top,
                x: node.x1,
                x0: node.x0,
                color: node.color || DISCRETE_COLOR_RANGE[0],
                sourceLinks: null,
                targetLinks: null
              };
            })}
            style={style.rects}
            onValueClick={onValueClick}
            onValueMouseOver={onValueMouseOver}
            onValueMouseOut={onValueMouseOut}
            colorType="literal" />
        }
        {!hideLabels && (
          <LabelSeries
            animation={animation}
            className={className}
            data={nodesCopy.map(node => {
              return {
                x: node.x0 + (node.x0 < width / 2 ? nWidth + 10 : -10),
                y: node.y0 + (node.y1 - node.y0) / 2 - formattedMargin.top,
                label: node.name,
                style: style.labels
              };
            })}
            />
        )}
        {hasVoronoi && (
          <Voronoi
            className="rv-sankey__voronoi"
            extent={[[-margin, -margin], [width + margin, height + margin]]}
            nodes={nodesCopy}
            onClick={onValueClick}
            onHover={onValueMouseOver}
            onBlur={onValueMouseOut}
            x={d => d.x0 + (d.x1 - d.x0) / 2}
            y={d => d.y0 + (d.y1 - d.y0) / 2}
          />
        )}
      </XYPlot>
    );
  }

}

Sankey.defaultProps = {
  align: 'justify',
  className: '',
  hasVoronoi: false,
  hideLabels: false,
  layout: 50,
  margin: 20,
  nodePadding: 10,
  nodeWidth: 10,
  onValueMouseOver: NOOP,
  onValueClick: NOOP,
  onValueMouseOut: NOOP,
  style: {
    links: {},
    rects: {},
    labels: {}
  }
};
Sankey.propTypes = {
  align: PropTypes.oneOf(['justify', 'left', 'right', 'center']),
  className: PropTypes.string,
  hasVoronoi: PropTypes.bool,
  height: PropTypes.number.isRequired,
  hideLabels: PropTypes.bool,
  layout: PropTypes.number,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]).isRequired,
    target: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]).isRequired
  })).isRequired,
  margin: PropTypes.number,
  nodePadding: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeWidth: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  style: PropTypes.shape({
    links: PropTypes.object,
    rects: PropTypes.object,
    labels: PropTypes.object
  }),
  width: PropTypes.number.isRequired
};
export default Sankey;
