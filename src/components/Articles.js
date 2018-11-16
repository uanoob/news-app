import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from './Article';
import accordion from '../decorators/accordion';
import { getAllArticles } from '../store/actions';
import articlesSelector from '../selectors/article.selector';

class Articles extends Component {
  state = {};

  static defaultProps = {
    articles: [],
    openItemId: null,
  };

  static propTypes = {
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author_id: PropTypes.string.isRequired,
        author_name: PropTypes.string.isRequired,
        posted_at: PropTypes.string.isRequired,
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
    // console.log('---', 'render article list');
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
  articles: articlesSelector(state),
});

const mapDispatchToProps = {
  onGetAllArticles: getAllArticles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(accordion(Articles));
