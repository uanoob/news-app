import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Articles from '../components/article/Articles';
import ArticleForm from '../components/article/ArticleForm';
import { handleAuthorAvatar, stringToColor } from '../utils';

const styles = theme => ({
  container: {
    margin: 'auto',
    marginTop: 20,
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
});

class AuthorPage extends Component {
  state = {
    articleDialog: false,
  };

  handleArticleClick = () => {
    const { articleDialog } = this.state;
    this.setState({
      articleDialog: !articleDialog,
    });
  };

  render() {
    const {
      classes, match, userId, userName, userEmail,
    } = this.props;
    const { articleDialog } = this.state;
    return (
      <div>
        <div className={classes.container}>
          {match.params.id === userId ? (
            <Card>
              <CardHeader
                avatar={(
                  <Avatar
                    aria-label="Recipe"
                    style={{
                      backgroundColor: stringToColor(userName || 'Anonymous'),
                    }}
                  >
                    {handleAuthorAvatar(userName || 'Anonymous')}
                  </Avatar>
)}
                action={(
                  <IconButton onClick={this.handleArticleClick}>
                    <AddIcon />
                  </IconButton>
)}
                title={userName}
                subheader={userEmail}
              />
            </Card>
          ) : null}
          <Articles authorId={match.params.id} />

          <ArticleForm
            dialog={articleDialog}
            handleDialogClick={this.handleArticleClick}
            header="Add an article"
            description="Please add your article here."
          />
        </div>
      </div>
    );
  }
}
AuthorPage.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.user._id,
  userName: state.user.user.name,
  userEmail: state.user.user.email,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(AuthorPage));
