import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from './Article';
import { getArticleById } from '../../store/actions';

class CurrentArticle extends Component {
  state = {};

  componentDidMount() {
    const { onGetArticleById, match } = this.props;
    const articleId = match.params.id;
    onGetArticleById(articleId);
  }

  render() {
    const { article, userId } = this.props;
    return article ? (
      <div>{<Article article={article} userId={userId} />}</div>
    ) : null;
  }
}

CurrentArticle.propTypes = {
  onGetArticleById: PropTypes.func.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  article: state.article.article,
  userId: state.user.user._id,
});

const mapDispatchToProps = {
  onGetArticleById: getArticleById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentArticle);
