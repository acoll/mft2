import { h, Component } from "preact";
import { Router } from "preact-router";
import style from "./app.less";

import Header from "./header";
import Footer from "./footer";
import Home from "../routes/home";
import Register from "../routes/register";
import Results from "../routes/results";

import { pageview, event } from "../lib/tracking";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    pageview();
    event("ROUTE", { event_label: `URL:${e.url}` });
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };
  render() {
    return (
      <div id="app" class={style.app}>
        <Header />
        <div className="content">
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Register path="/register/" />
            <Results path="/results/:year" />
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}
