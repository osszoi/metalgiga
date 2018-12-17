(() => {
  class ChartsService {
    constructor(LINES_CHART, INVERSE_LINES_CHART, SPLINES_CHART, COLUMNS_CHART, BARS_CHART, AREAS_CHART, AREA_SPLINES_CHART, DONUT_CHART, HALF_DONUT_CHART, PIE_CHART) {
      this.LINES_CHART = LINES_CHART;
      this.INVERSE_LINES_CHART = INVERSE_LINES_CHART;
      this.SPLINES_CHART = SPLINES_CHART;
      this.COLUMNS_CHART = COLUMNS_CHART;
      this.BARS_CHART = BARS_CHART;
      this.AREAS_CHART = AREAS_CHART;
      this.AREA_SPLINES_CHART = AREA_SPLINES_CHART;
      this.DONUT_CHART = DONUT_CHART;
      this.HALF_DONUT_CHART = HALF_DONUT_CHART;
      this.PIE_CHART = PIE_CHART;

      this.colors = ['#205660', '#ff7726'];
    }

    basic(height = 300, title = null) {
      return {
        chart: {
          height: height,
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: null,
          style: {
            fontFamily: 'Open Sans, Helvetica'
          }
        },
        options: {},
        title: {
          text: title,
          align: 'left',
          margin: 30,
          style: {
            fontSize: '30px'
          }
        },
        loading: true,
        credits: {
          text: 'Pathway',
          enabled: true
        }
      };
    }

    getLines(height = 300, title = null) {
      return this._merge(height, this.LINES_CHART, title);
    }

    getInverseLines(height = 300, title = null) {
      return this._merge(height, this.INVERSE_LINES_CHART, title);
    }

    getSplines(height = 300, title = null) {
      return this._merge(height, this.SPLINES_CHART, title);
    }

    getColumns(height = 300, title = null, stacking = null) {
      let chart = this._merge(height, this.COLUMNS_CHART, title);

      if (stacking) {
        chart.plotOptions.column.stacking = stacking; // 'percent', 'normal'
      }

      this.setColors(chart);

      return chart;
    }

    getBars(height = 300, title = null, stacking = null) {
      let chart = this._merge(height, this.BARS_CHART, title);

      if (stacking) {
        chart.plotOptions.bar.stacking = stacking; // 'percent', 'normal'
      }

      return chart;
    }

    getAreas(height = 300, title = null, stacking = null) {
      let chart = this._merge(height, this.AREAS_CHART, title);

      if (stacking) {
        chart.plotOptions.area.stacking = stacking; // 'percent', 'normal'
      }

      return chart;
    }

    getAreaSplines(height = 300, title = null, stacking = null) {
      let chart = this._merge(height, this.AREA_SPLINES_CHART, title);

      if (stacking) {
        chart.plotOptions.areaspline.stacking = stacking; // 'percent', 'normal'
      }

      return chart;
    }

    getHalfDonut(height = 300, title = null) {
      let chart = this._merge(height, this.HALF_DONUT_CHART, title);

      chart.plotOptions.pie.colors = this.colors;

      return chart;
    }

    getDonut(height = 300, title = null) {
      let chart = this._merge(height, this.DONUT_CHART, title);

      chart.plotOptions.pie.colors = this.colors;

      return chart;
    }

    getPie(height = 300, title = null) {
      let chart = this._merge(height, this.PIE_CHART, title);

      chart.plotOptions.pie.colors = this.colors;

      return chart;
    }

    _template(height = 300, title = null) {
      return {
        chart: {
          height: height,
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          reflow: true,
          style: {
            fontFamily: 'Open Sans, Helvetica'
          }
        },
        title: {
          text: title,
          align: 'left',
          margin: 30,
          style: {
            fontSize: '30px'
          }
          // align: 'center',
          // verticalAlign: 'middle',
          // y: 40
        },
        resize: true,
        tooltip: {
          shared: false,
          pointFormat: '{series.name}: <strong>{point.y}</strong>'
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          squareSymbol: false,
          symbolHeight: 12,
          symbolWidth: 40,
          symbolRadius: 0,
          itemMarginBottom: 3,
          labelFormatter: function() {
            return this.name /*+ ' (' + this.y + '%)'*/;
          },
          itemStyle: {
            fontFamily: 'Open Sans',
            fontWeight: 'normal'
          }
        },

        loading: false,
        credits: {
          enabled: false
        }
      };
    }

    setColors(chart) {
      _.each(chart.series, (value, index) => {
        value.color = this.colors[index % this.colors.length];
      });
    }

    _merge(height = 300, settings, title = null) {
      let chart = angular.merge(this._template(height, title), settings);

      this.setColors(chart);

      return chart;
    }
  }

  angular.module('app').service('ChartsService', ChartsService);
})();
