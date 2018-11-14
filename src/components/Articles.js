import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from './Article';
import accordion from '../decorators/accordion';
import { getAllArticles } from '../store/actions';

class Articles extends Component {
  state = {};

  static defaultProps = {
    articles: [],
    openItemId: null,
  };

  static propTypes = {
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        comments: PropTypes.arrayOf(PropTypes.string),
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }).isRequired,
    ),
    onGetAllArticles: PropTypes.func.isRequired,
    toggleOpenItem: PropTypes.func.isRequired,
    openItemId: PropTypes.string,
  };

  componentDidMount() {
    const { onGetAllArticles } = this.props;
    onGetAllArticles();
  }

  render() {
    const { articles, openItemId, toggleOpenItem } = this.props;
    return articles && articles.length !== 0 ? (
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <Article
              article={article}
              isOpen={article._id === openItemId}
              toggleOpen={() => toggleOpenItem(article._id)}
            />
          </li>
        ))}
      </ul>
    ) : null;
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
});

const mapDispatchToProps = {
  onGetAllArticles: getAllArticles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(accordion(Articles));
