import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ForwardIcon from '@material-ui/icons/ForwardOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Comments from '../comment/Comments';
import CommentForm from '../comment/CommentForm';
import ArticleForm from './ArticleForm';
import {
  handleAuthorAvatar,
  stringToColor,
  cutStringLength,
} from '../../utils';

const styles = theme => ({
  card: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Article extends Component {
  state = {
    expanded: false,
    articleDialog: false,
    commentDialog: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleArticleClick = () => {
    const { articleDialog } = this.state;
    this.setState({
      articleDialog: !articleDialog,
    });
  };

  handleCommentClick = () => {
    const { commentDialog } = this.state;
    this.setState({
      commentDialog: !commentDialog,
    });
  };

  handleCurrentArticle = (articleId) => {
    const { history } = this.props;
    history.push(`/article/${articleId}`);
  };

  handleIsAuthor = () => {
    const { article, userId } = this.props;
    return article.author_id === userId ? (
      <div>
        <IconButton>
          <EditIcon onClick={this.handleArticleClick} />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => this.handleDeleteArticle(article._id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ) : null;
  };

  render() {
    const { classes, article, userId } = this.props;
    const { expanded, articleDialog, commentDialog } = this.state;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar
              aria-label="Recipe"
              style={{
                backgroundColor: stringToColor(
                  article.author_name || 'Anonymous',
                ),
              }}
            >
              {handleAuthorAvatar(article.author_name || 'Anonymous')}
            </Avatar>
)}
          action={
            !userId ? (
              <IconButton
                onClick={() => this.handleCurrentArticle(article._id)}
              >
                <ForwardIcon />
              </IconButton>
            ) : (
              this.handleIsAuthor()
            )
          }
          title={article.title}
          subheader={article.posted_at}
        />

        <CardContent>
          <Typography component="p">
            {userId ? article.text : cutStringLength(article.text)}
          </Typography>
        </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Message" onClick={this.handleCommentClick}>
            <CommentIcon />
          </IconButton>

          <CommentForm
            articleId={article._id}
            dialog={commentDialog}
            handleDialogClick={this.handleCommentClick}
            title="Add a comment"
            description="Please enter your comment here."
          />

          <ArticleForm
            articleId={article._id}
            articleTitle={article.title}
            articleText={article.text}
            dialog={articleDialog}
            handleDialogClick={this.handleArticleClick}
            header="Edit an article"
            description="Please edit your article here."
          />

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comments articleId={article._id} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Article.defaultProps = {
  userId: '',
};

Article.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
    expand: PropTypes.string.isRequired,
    expandOpen: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    posted_at: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  userId: PropTypes.string,
};

export default withRouter(withStyles(styles)(Article));
