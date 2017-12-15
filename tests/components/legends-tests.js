import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import ContinuousSizeLegend from '../../showcase/legends/continuous-size';
import ContinuousColorLegend from '../../showcase/legends/continuous-color';

import HorizontalDiscreteLegend from '../../showcase/legends/horizontal-discrete-color';
import VerticalDiscreteLegend from '../../showcase/legends/vertical-discrete-color';
import SearchableDiscreteLegend from '../../showcase/legends/searchable-discrete-color';
import HorizontalDiscreteCustomPalette from
  '../../showcase/legends/horizontal-discrete-custom-palette';

test('Discrete Legend has no clickable className while onItemClick is not passing', t => {
  const withOnClick$ = mount(<VerticalDiscreteLegend />);
  const withoutOnClick$ = mount(<SearchableDiscreteLegend />);

  t.equal(withOnClick$.find('.rv-discrete-color-legend-item .vertical').first().props().onClick, null, 'should not have onClick prop');
  t.notEqual(withoutOnClick$.find('.rv-discrete-color-legend-item .vertical .clickable').first().props().onClick, Function, 'should have onClick prop');

  t.end();
});

test('Continuous Size Legend', t => {
  const $ = mount(<ContinuousSizeLegend/>);
  t.equal($.text(), '          100200', 'should find the correct text content');
  t.equal($.find('.rv-bubble').length, 10, 'should find the right number of bubbles');

  t.end();
});

test('Continuous Color Legend', t => {
  const $ = mount(<ContinuousColorLegend/>);
  t.equal($.text(), '100200150', 'should find the correct text content');
  const expectedStyle = {background: 'linear-gradient(to right, #EF5D28,#FF9833)'};
  t.deepEqual($.find('.rv-gradient').props().style, expectedStyle, 'should find the correct styling');
  t.end();
});

test('Discrete Legends', t => {
  [HorizontalDiscreteLegend, VerticalDiscreteLegend].forEach(Component => {
    const $ = mount(<Component/>);
    t.equal($.text(), 'OptionsButtonsSelect boxesDate inputsPassword inputsFormsOther',
    'should find the correct text content');
    t.equal($.find('.rv-discrete-color-legend-item__color').length, 7,
    'should find the right number of elements');
  });

  t.deepEqual(mount(<HorizontalDiscreteLegend/>)
    .find('.rv-discrete-color-legend-item__color').first()
    .props().style, {background: '#12939A'},
    'normal discrete legend uses default palette');

  t.deepEqual(mount(<HorizontalDiscreteCustomPalette/>)
    .find('.rv-discrete-color-legend-item__color').first()
    .props().style, {background: '#6588cd'},
    'custom discrete legend uses custom palette');

  const $ = mount(<SearchableDiscreteLegend/>);
  t.equal($.text(), 'ApplesBananasBlueberriesCarrotsEggplantsLimesPotatoes',
  'should find the correct text content for the searchable legend');
  t.equal($.find('.rv-discrete-color-legend-item__color').length, 7,
  'should find the right number of element for the searchable legends');
  $.find('.rv-search-wrapper__form__input').simulate('change', {target: {value: 'egg'}});
  t.equal($.text(), 'Eggplants', 'should find the correct text content after search');
  const itemsFound = $.find('.rv-discrete-color-legend-item__color').length;
  t.equal(itemsFound, 1, 'should find the right number of elements for the searchable legend after searched');

  t.equal($.find('.disabled').length, 0, 'before clicking, should find no items disabled');
  $.find('.clickable').simulate('click');
  t.equal($.find('.disabled').length, 1, 'before clicking, should find no items disabled');

  t.end();
});

test('Discrete Legends Showcase: HorizontalDiscreteCustomPalette', t => {
  const $ = mount(<HorizontalDiscreteCustomPalette/>);
  const colors = $.find('.rv-discrete-color-legend-item__color').map(colorBrick => {
    return colorBrick.props().style.background;
  }).join(' ');

  t.equal(colors, '#6588cd #66b046 #a361c7 #ad953f #c75a87 #55a47b #cb6141', 'should find all correct values for the colors');
  t.equal($.text(), 'OptionsButtonsSelect boxesDate inputsPassword inputsFormsOther', 'should find the right text');

  $.find('.rv-discrete-color-legend-item').first().simulate('mouseEnter');
  t.equal($.text(), 'OptionsSELECTEDButtonsSelect boxesDate inputsPassword inputsFormsOther', 'should find the right text, with the first element selected');

  t.end();
});
