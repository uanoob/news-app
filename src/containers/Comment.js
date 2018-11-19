import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  card: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const Comment = (props) => {
  const { classes, comment, userId } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <IconButton>
            <Avatar aria-label="Author" className={classes.avatar}>
              R
            </Avatar>
          </IconButton>
)}
        action={
          comment.author_id === userId ? (
            <div>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </div>
          ) : null
        }
        title={comment.author_name}
        subheader={comment.posted_at}
      />
      <CardContent>
        <Typography component="p">{comment.text}</Typography>
      </CardContent>
    </Card>
  );
};

Comment.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    article_id: PropTypes.string.isRequired,
    posted_at: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userId: state.user.user._id,
});

export default connect(mapStateToProps)(withStyles(styles)(Comment));
