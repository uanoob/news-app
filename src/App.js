import React, { Component } from 'react';
import './App.css';

import Select from 'react-select';
import Articles from './components/Articles';
import { getArticles } from './api';

class App extends Component {
  state = {
    articles: [],
    selection: null,
  };

  componentDidMount() {
    this.getAllArticles();
  }

  getAllArticles = async () => {
    const articles = await getArticles();
    this.setState({ articles });
  };

  changeSelection = (selection) => {
    this.setState({
      selection,
    });
  };

  render() {
    const { articles, selection } = this.state;
    const options = articles.map(article => ({
      value: article._id,
      label: article.title,
    }));
    return articles.length !== 0 ? (
      <div>
        <Select
          options={options}
          value={selection}
          onChange={this.changeSelection}
          isMulti
        />
        <Articles articles={articles} />
      </div>
    ) : null;
  }
}

export default App;
