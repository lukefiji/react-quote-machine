import React, { Component } from "react";
import jsonpP from "jsonp-p";

import quoteImgOpen from "../quote-open.svg";
import quoteImgClose from "../quote-close.svg";

import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      quote: "Click on 'New Quote' to fetch a design quote.",
      author: "Luke Fiji"
    };
  }

  generateQuote = async () => {
    const quoteData = await jsonpP(
      "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=2&_jsonp=jsonp",
      { name: "jsonp" }
    ).promise;
    console.log(await quoteData[0]);
    const quote = await quoteData[0].content.replace(/<\/?[^>]+(>|$)/g, "");
    const author = await quoteData[0].title;
    this.setState({ quote, author });
  };

  render() {
    return (
      <div>
        <h1 id="quote__header">Design Quotes</h1>
        <div id="quote__container">
          <img id="quote__start" src={quoteImgOpen} />
          <div id="quote__text">
            <p>
              {this.state.quote}
            </p>
          </div>
          <img id="quote__end" src={quoteImgClose} />
        </div>
        <p id="quote__author">
          -{this.state.author}
        </p>
        <div id="button__container">
          <button id="button__new" onClick={this.generateQuote}>
            New Quote
          </button>
          <button id="button__tweet">Tweet</button>
        </div>
      </div>
    );
  }
}

export default App;
