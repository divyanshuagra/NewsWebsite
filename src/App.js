import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_APIKEY

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><News key="general" pageSize={5} country="in" apiKey={this.apiKey} category="general" /></Route>
            <Route exact path="/business"><News key="business" pageSize={5} country="in" apiKey={this.apiKey} category="business" /></Route>
            <Route exact path="/entertainment"><News key="entertainment" pageSize={5} country="in" apiKey={this.apiKey} category="entertainment" /></Route>
            <Route exact path="/health"><News key="health" pageSize={5} country="in" apiKey={this.apiKey} category="health" /></Route>
            <Route exact path="/science"><News key="science" pageSize={5} country="in" apiKey={this.apiKey} category="science" /></Route>
            <Route exact path="/sports"><News key="sports" pageSize={5} country="in" apiKey={this.apiKey} category="sports" /></Route>
            <Route exact path="/technology"><News key="technology" pageSize={5} country="in" apiKey={this.apiKey} category="technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

