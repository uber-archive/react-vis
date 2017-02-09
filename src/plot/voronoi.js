import React, {PropTypes} from 'react';
import {voronoi} from 'd3-voronoi';

const NOOP = f => f;

function Voronoi({className, extent, nodes, onBlur, onClick, onHover, x, y}) {
  // Create a voronoi with each node center points
  const voronoiInstance = voronoi()
    .x(x)
    .y(y)
    .extent(extent);

  return (
    <g className={`${className} rv-voronoi`}>
      {voronoiInstance.polygons(nodes).map((d, i) => (
        <path
          d={`M${d.join('L')}Z`}
          onClick={() => onClick(d.data)}
          onMouseOver={() => onHover(d.data)}
          onMouseOut={() => onBlur(d.data)}
          fill="none"
          style={{pointerEvents: 'all'}}
          key={i} />
      ))}
    </g>
  );
}

Voronoi.defaultProps = {
  className: '',
  onBlur: NOOP,
  onClick: NOOP,
  onHover: NOOP,
  x: d => d.x,
  y: d => d.y
};

Voronoi.propTypes = {
  className: PropTypes.string,
  extent: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
};

export default Voronoi;
