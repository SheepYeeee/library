import React, { Component } from "react";
import _ from "lodash";
import { Table } from "antd";

export default class BarChart extends Component {

    // 篩選後table變更
    onChang = (pagination, filters, sorter, extra) => {
      console.log("params", pagination, filters, sorter, extra);
    }

    componentDidMount = () => {
    }

    componentDidUpdate = () => {
    }

    render() {
      return (
        <div>
          <Table columns={this.props.columns} dataSource={this.props.data} onChange={this.onChange} />
        </div>
      );
    }
}
