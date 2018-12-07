import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Article from './Article';
import Preloader from '../../containers/preloader/Preloader';
import {
  getAllArticles,
  getArticlesByAuthorId,
  clearArticles,
} from '../../store/actions';

const styles = theme => ({
  root: {
    margin: 'auto',
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  loader: {
    margin: 'auto',
    textAlign: 'center',
  },
  error: {
    margin: 'auto',
    marginTop: 20,
    textAlign: 'center',
  },
});

export class ArticlesComponent extends Component {
  state = {};

  componentDidMount() {
    this.getArticles();
  }

  componentWillUnmount() {
    const { onClearArticles } = this.props;
    onClearArticles();
  }

  getArticles = () => {
    const { authorId, onGetAllArticles, onGetArticlesByAuthorId } = this.props;
    return authorId ? onGetArticlesByAuthorId(authorId) : onGetAllArticles();
  };

  render() {
    const {
      classes, articles, isLoading, isLoaded, errorMsg,
    } = this.props;
    return (
      <Fragment>
        {articles && articles.length !== 0 && (
          <div className={classes.root}>
            <List component="nav">
              {articles.map(article => (
                <ListItem key={article._id}>
                  <Article article={article} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {isLoading && !isLoaded ? (
          <div className={classes.loader}>
            <Preloader />
          </div>
        ) : null}
        {isLoaded && !articles.length ? (
          <span id="articles-empty-message" className={classes.error}>
            No articles yep
          </span>
        ) : null}
        {errorMsg && (
          <span id="articles-error-message" className={classes.error}>
            {errorMsg}
          </span>
        )}
      </Fragment>
    );
  }
}

ArticlesComponent.defaultProps = {
  articles: [],
  authorId: '',
  isLoading: false,
  isLoaded: false,
  errorMsg: null,
};

ArticlesComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      author_id: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }).isRequired,
  ),
  authorId: PropTypes.string,
  onGetAllArticles: PropTypes.func.isRequired,
  onGetArticlesByAuthorId: PropTypes.func.isRequired,
  onClearArticles: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isLoaded: PropTypes.bool,
  errorMsg: PropTypes.string,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  isLoading: state.articles.loading,
  isLoaded: state.articles.loaded,
  errorMsg: state.articles.error,
});

const mapDispatchToProps = {
  onGetAllArticles: getAllArticles,
  onGetArticlesByAuthorId: getArticlesByAuthorId,
  onClearArticles: clearArticles,
};

const Articles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ArticlesComponent));

export default Articles;
