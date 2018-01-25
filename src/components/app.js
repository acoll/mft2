import { h, Component } from "preact";
import { Router } from "preact-router";
import styled from "styled-components";

import Header from "./header";
import Footer from "./footer";
import Home from "../routes/home";
import Register from "../routes/register";
import Results from "../routes/results";

import { pageview, event } from "../lib/tracking";

// const sheet = new ServerStyleSheet();

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-rows: auto 1fr auto;

  @media only screen and (max-width: 700px) {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  opacity: 0;
  animation: appear 1s ease;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;

  .content {
  }
`;

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
      <Styles id="app">
        <Header />
        <div className="content">
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Register path="/register/" />
            <Results path="/results/:year" />
          </Router>
        </div>
        <Footer />
      </Styles>
    );
  }
}
