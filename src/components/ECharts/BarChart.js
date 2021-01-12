import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import "echarts/lib/component/dataZoom";

export default class BarChart extends Component {
  componentDidMount = () => {
    this.renderChart();
  }

  componentDidUpdate = () => {
    this.renderChart();
  }

  renderChart = () => {
    const myChart = echarts.init(document.getElementById(this.props.id));

    // 繪製圖表
    myChart.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: this.props.data.y
      },
      toolbox: {
        show: true,
        feature: {
          restore: { show: true },
          saveAsImage: {
            show: true,
            type: "jpg",
          }
        }
      },
      dataZoom: [
        {
          show: true,
          type: "slider",
          zoomOnMouseWheel: true,
          start: 0,
          end: 100,
        }
      ],
      xAxis: [
        {
          type: "category",
          name: this.props.axis.x,
          data: this.props.data.x
        }
      ],
      yAxis: [
        {
          name: this.props.axis.y,
          type: "value",
        }
      ],
      series: this.props.config
    });
  }

  render() {
    return (
      <div>
        <div id={this.props.id} style={{ width: "80%", height: 600 }}></div>
      </div>
    );
  }
}
