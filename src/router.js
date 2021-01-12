import React, {Component} from "react";
import _ from "lodash";
import {Route, Switch, Redirect, routerRedux, withRouter} from "dva/router";
import PropTypes from "prop-types";

import AppSwitch from "./routes/AppSwitch";
import Index from "./routes/Index";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Favorites from "./routes/Favorites";
import Search from "./routes/Search";
import Book from "./routes/Book";
import Dashboard from "./routes/Dashboard";


const {ConnectedRouter} = routerRedux;

class Root extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const {children} = this.props;
    return children;
  }
}

const RouterRoot = withRouter(_.flow()(Root));

export default function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <RouterRoot {...props}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/index/1"/>}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <AppSwitch>
            <Route path="/index/:page" exact component={Index}/>
            <Route path="/search" component={Search}/>
            <Route path="/favorites" exact component={Favorites}/>
            <Route path="/book/:isbn" exact component={Book}/>
            <Route path="/dashboard" component={Dashboard}/>
          </AppSwitch>
        </Switch>
      </RouterRoot>
    </ConnectedRouter>
  );
}
