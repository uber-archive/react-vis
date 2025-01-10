> This library is deprecated. Please see `DEPRECATED.md`.

## Scales and data

### Data

React-Vis charts are made of Series components - LineSeries, BarSeries and so on and so forth.
Each of these Series components requires a `data` property, through which we pass an array of objects.

These properties correspond to various visual characteristics of the corresponding marks. For example, x and y, which are required for most series types, affect the position of each mark. Each series type takes more properties, though, which are described in the series section.

Here is how a simple dataset is transformed in some simple charts:

<!-- INJECT:"MiniChartsWithLink" -->

```jsx
const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];

...

<XYPlot height={200} width={200}>
  <VerticalBarSeries data={data} />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={data} />
</XYPlot>
<XYPlot height={200} width={200}>
  <MarkSeries data={data} />
</XYPlot>

```

By the way: can you guess what this dataset is? Answer at the end of the document.

### Scales

Scales are what actually transform the values of the properties in the data objects into visual attributes. In the example above, for instance, the third object is {x: 2, y: 4}. But the corresponding rectangle is 39.45px from the left and 105.56px from the top of the top left corner of the chart. How? Scales.

React-vis scales are designed so that as often as possible, you shouldn't have to do anything; yet they give you control to override anything they do.  

The notion of scales and the corresponding vocabulary are directly taken from d3js.
Scales have a type, a range and a domain. For a given chart, there are multiple scales: there's one scale per attribute. Attributes include x position, y position, color, size, angle etc. Again, not all attributes are applicable in all series.

We are following the definition of scales which was given by Mike Bostock: _scales are functions that map from an input domain to an output range_.

Under the hood, scales have a default type; a default domain can be inferred automatically from the data and, depending on the attribute, there's either a default range, or it is being generated depending on context.

For example, for x and y:
- the default type is a linear scale (the relationship between the value in the data object and the actual position of the mark is of the form: y = ax + b ),
- the domain is defined by the smallest and highest values for found in the dataset - in the above example, both x and y vary from 0 to 9, so the domains are [0, 9] for both the x- and the y- scale,
- and the range is the total width of the XYPlot minus the margin.

All of this is sensible most of the time.

Scales transform each datapoint into visual characteristics for a mark, so, for a given attribute, they only work if the corresponding data property exists. The property in the datapoint MUST have the same name as the attribute. You can have all the properties you want in your datapoint object, but to position the mark from left to right, you NEED an x property.

### Available scales by series type:

Here is what attribute is available as a scale per series type, and what is the default scale type:

| Series              | angle  | angle0 | color      | fill       | opacity    | radius | radius0 | size   | stroke     | x      | x0     | y      | y0     |
|---------------------|--------|--------|------------|------------|------------|--------|---------|--------|------------|--------|--------|--------|--------|
| [ArcSeries](arc-series.md)           | linear | linear | linear     | linear     | literal    | linear | linear  |        | linear     | linear |        | linear |        |
| [AreaSeries](area-series.md)          |        |        | / series | / series | / series |        |         |        | / series | linear |        | linear | linear |
| [ContourSeries](contour-series.md)       |        |        | linear*    |            |            |        |         |        |            | linear |        | linear |        |
| [HeatmapSeries](heatmap-series.md)       |        |        | linear     |            | literal    |        |         |        | linear     | linear |        | linear |        |
| [HorizontalBarSeries](bar-series.md) |        |        | linear     | linear     | literal    |        |         |        | linear     | linear | linear | linear |        |
| [LabelSeries](label-series.md)         |        |        |            |            |            |        |         |        |            | linear |        | linear |        |
| [LineSeries](line-series.md)          |        |        | / series |            | / series |        |         |        | / series | linear |        | linear |        |
| [MarkSeries](mark-series.md)          |        |        | linear     | linear     | literal    |        |         | linear | linear     | linear |        | linear |        |
| [PolygonSeries](polygon-series.md)       |        |        | / series |            |            |        |         |        |            | linear |        | linear |        |
| [RectSeries](rect-series.md)          |        |        | linear     | linear     | literal    |        |         |        | linear     | linear | linear | linear | linear |
| [VerticalBarSeries](bar-series.md)   |        |        | linear     | linear     | literal    |        |         |        | linear     | linear |        | linear | linear |

For the Heatmap and Hexbin series, while you can pass a colorDomain and a colorRange, you cannot override the type of scale for colors.

"Per series" means that it's possible to pass a value to the series as a whole, but not per data point.

If an attribute is not available as a scale for a given series, all values passed in the corresponding property will be ignored. For instance, if you use a dataset that has fill properties, it will be ignored for LineSeries.

This table is also meant to be used for derived series. Canvas series have the same interface as SVG series. HorizontalRectSeries and VerticalRectSeries take the same attribute as RectSeries. And LineMarkSeries take the same attribute as Line and Mark series.

### Scale properties

To redefine a scale, you must pass a prop to the series that uses that scale. The prop names are based on the name of the attribute: name + Domain, name + Range, name + Type, name + Padding (for instance: yDomain, colorType, xRange).

* `get[name]` (optional)  
  Type: `function`  
  An accessor function that gets the value to be compute from the data. For instance if you were keeping your data as rows like {a: 1, b: 2, c: 3}, you could define an x accessor like `getX: d => d.a`.
* `[name]Domain` (optional)  
  Type: `Array`  
  Array of values to visualize from. If domain is not passed, it will be calculated from the values which are passed to component.
* `[name]Padding` (optional)  
  Type: `Number`  
  A percentage that will pad your `[name]Domain`. If the padding not passed `[name]Domain` will not be padded. Note: if you pass `[name]Domain` and it is not calculated from the values, padding will not be used.
* `[name]Range` (optional)
  Type: `Array`  
  Array of real-world values to visualize to. If range is not passed, the defaults (depend on visualization type) will be applied.
* `[name]Type` (optional)  
  Type: `('linear'|'ordinal'|'category'|'time'|'time-utc'|'log'|'literal')`  
  Default: `'linear'`  
  Type of the scale. Each scale type can be one of following values:
    * `'linear'`  
    Continuous scale, that works with numbers. Similar to [d3.scaleLinear](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear).
    * `'ordinal'`  
    Ordinal scale, works with numbers and strings. Similar to [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales).
    * `'category'`  
    Categorical scale, each new value gets the next value from the range. Similar to d3.scale.category\[Number\], but works with other values besides colors.
    * `'time'`  
    Time scale. Similar to [d3.scaleTime](https://github.com/d3/d3-scale/blob/master/README.md#time-scales).
    * `'time-utc'`  
    Time UTC scale. Similar to [d3.scaleUtc](https://github.com/d3/d3-scale/blob/master/README.md#scaleUtc)
    * `'log'`  
    Log scale. Similar to [d3.scaleLog](https://github.com/d3/d3-scale/blob/master/README.md#log-scales).
    * `'literal'`  
    Returns exactly the value that was given to it. Similar to [d3.scaleIdentity](https://github.com/d3/d3-scale#scaleIdentity), except that it does NOT coerce data into numbers. This is useful for precisely specifying properties in the data, eg color can be specified directly on the data.

### Overriding scales

Scales can be defined either at the XYPlot level, in which case they apply to the whole chart, or at the series level. Scales defined at the series level override those defined at the XYPlot level.

The scales provided to each individual series don't have to have the same parameters. For instance, if you wanted to do a dual-axis chart, you could provide a different yDomain and yRange to two data series (use at your own risk).

### A brief example

Let's apply these ideas to a reasonably common use case: reversing the domain of a chart. Imagine we wanted to reverse the x display order of our mark series above. To do this we would make use of the xDomain and our prior knowledge of the domain of the x variable.

```javascript
<XYPlot height={200} width={200} xDomain={[9, 0]}>
  <MarkSeries data={data} />
</XYPlot>
```

This of course applies for all types of series.

### Other uses of scales

Scales can also be used in [Axes](axes.md) and in [Gridlines](grids.md). You can pass an x-scale (so xDomain, xRange, xPadding, xType) to an XAxis or a VerticalGridLines component, and a y-scale (so yDomain, yRange, yPadding, yType) to a YAxis or HorizontalGridLines component. These scale parameters don't have to be the same as the ones passed to your series.

Did you guess that this data set was the digits sorted alphabetically? eight, five, four...

### Time scale localization

The locale used by d3 to format the time series tick labels is `en-US` by default. You can override it by providing a locale object to the `timeFormatDefaultLocale` function of [d3-time-format](https://github.com/d3/d3-time-format#timeFormatDefaultLocale) which you need to have as a dependency. [Various locale files](https://github.com/d3/d3-time-format/tree/master/locale) are available in the [d3-time-format git repository](https://github.com/d3/d3-time-format#timeFormatDefaultLocale).

eg for including the french locale :
```javascript
import {timeFormatDefaultLocale} from 'd3-time-format';
timeFormatDefaultLocale({
    dateTime    : '%a %b %e %X %Y',
    date        : '%d/%m/%Y',
    time        : '%H : %M : %S',
    periods     : ['AM', 'PM'],
    days        : ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    shortDays   : ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    months      : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    shortMonths : ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
});
```
If you do not want to add d3-time-format as a dependency, you can still use the `tickFormat` prop that can be passed to [Axes](axes.md) to handle the localization yourself, although you will lose the benefits of d3-scale formatting.
