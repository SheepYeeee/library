import React, { Component } from "react";
import { Switch } from "dva/router";
import GlobalLayout from "../layout/GlobalLayout";

export default class AppSwitchComponent extends Component {
  render() {
    const { children } = this.props;
    return (
      <GlobalLayout {...this.props}>
        <Switch>{children}</Switch>
      </GlobalLayout>
    );
  }
}
