import React, { Component } from 'react';
import './App.css';

import Articles from './Articles';
import { getArticles } from './api';

class App extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.getAllArticles();
  }

  getAllArticles = async () => {
    const articles = await getArticles();
    this.setState({ articles });
  };
  render() {
    const { articles } = this.state;
    return articles.length !== 0 ? (
      <div>
        <Articles articles={articles} />
      </div>
    ) : null;
  }
}

export default App;
