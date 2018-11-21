import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Article from './Article';
import { getAllArticles } from '../../store/actions';

const styles = theme => ({
  root: {
    margin: 'auto',
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Articles extends Component {
  state = {};

  componentDidMount() {
    const { onGetAllArticles } = this.props;
    onGetAllArticles();
  }

  render() {
    const { classes, articles } = this.props;
    return articles && articles.length !== 0 ? (
      <div className={classes.root}>
        <List component="nav">
          {articles.map(article => (
            <ListItem key={article._id}>
              <Article article={article} />
            </ListItem>
          ))}
        </List>
      </div>
    ) : null;
  }
}

Articles.defaultProps = {
  articles: [],
};

Articles.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    nested: PropTypes.string.isRequired,
  }).isRequired,
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
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
});

const mapDispatchToProps = {
  onGetAllArticles: getAllArticles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Articles));
