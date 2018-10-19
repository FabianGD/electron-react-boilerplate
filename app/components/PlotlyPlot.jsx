import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

export default class PlotlyLinePlot extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div>
        <Plot
          data={[
            {
              x: data.xdata,
              y: data.ydata,
              type: 'scatter',
              mode: 'lines+points',
              marker: { color: 'red' }
            }
          ]}
          layout={{
            font: {
              family:
                "'Roboto Condensed', 'Open Sans', verdana, arial, sans-serif",
              size: 18
            },
            width: '99%',
            height: 400,
            margin: {
              l: 60,
              r: 60,
              t: 40,
              b: 40
            },
            xaxis: {
              mirror: true,
              linewidth: 2.5,
              tickwidth: 2.5,
              visible: true,
              showline: true,
              zeroline: false,
              ticks: 'outside'
            },
            yaxis: {
              mirror: true,
              linewidth: 2.5,
              tickwidth: 2.5,
              visible: true,
              showline: true,
              zeroline: false,
              ticks: 'outside'
            }
          }}
        />
      </div>
    );
  }
}

PlotlyLinePlot.propTypes = {
  data: PropTypes.shape({
    xdata: PropTypes.arrayOf(PropTypes.number).isRequired,
    ydata: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};
