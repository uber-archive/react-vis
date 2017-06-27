import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import RadialChart from 'radial-chart';
import BasicRadarChart from '../../showcase/radar-chart/basic-radar-chart';
import AnimatedRadarChart from '../../showcase/radar-chart/animated-radar-chart';

import {testRenderWithProps} from '../test-utils';

const RADAR_PROPS = {
  data: [{
    explosions: 7,
    wow: 10,
    dog: 8,
    sickMoves: 9,
    nice: 7
  }],
  domains: [
    {name: 'nice', domain: [0, 100]},
    {name: 'explosions', domain: [6.9, 7.1]},
    {name: 'wow', domain: [0, 11]},
    {name: 'dog', domain: [0, 16]},
    {name: 'sickMoves', domain: [0, 20]}
  ],
  height: 300,
  width: 400
};
// make sure that the components render at all
testRenderWithProps(RadialChart, RADAR_PROPS);

test('Radar: Showcase Example - Basic Radar Chart', t => {
  const $ = mount(<BasicRadarChart />);
  t.equal($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 6, 'should find the right number of axes');
  t.equal($.find('.rv-radar-chart-polygon').length, 3, 'should find the right number of axes');
  t.equal($.find('.rv-radar-chart').text(), '2.04.06.08.01013107.64.82.09.08.07.06.05.02.04.06.08.0101.42.84.25.67.03.04.05.06.07.0mileagepricesafetyperformanceinteriorwarranty', 'should find the right text content');
  t.end();
});

test('Radar: Showcase Example - Animated Radial ', t => {
  const $ = mount(<AnimatedRadarChart />);
  t.equal($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 5, 'should find the right number of axes');
  t.equal($.find('.rv-radar-chart-polygon').length, 1, 'should find the right number of axes');
  t.equal($.find('.rv-radar-chart').text(), 'niceexplosionswowdogsickMoves', 'should find the right text content');
  t.equal($.find('.rv-xy-plot__circular-grid-lines__line').length, 10, 'should find the correct number of rings');

  $.find('.showcase-button').simulate('click');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 5, 'should find the right number of axes');
  t.equal($.find('.rv-radar-chart-polygon').length, 1, 'should find the right number of axes');
  t.equal($.find('.rv-radar-chart').text(), 'niceexplosionswowdogsickMoves', 'should find the right text content');

  t.end();
});
