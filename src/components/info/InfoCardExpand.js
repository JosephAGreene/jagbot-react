import React from 'react';
import PropTypes from "prop-types"; 
import clsx from 'clsx';

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.gray.dark,
    '& .MuiCardHeader-action': {
      alignSelf: "flex-end",
      '& .MuiIconButton-root' : {
        color: theme.palette.white.main,
      },
    },
    '& .MuiCardHeader-title': {
      color: theme.palette.white.main,
    }, 
    '& .MuiCardHeader-subheader': {
      color: theme.palette.white.dark,
    },
  },
  header: {
    cursor: "pointer",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginTop: 'auto',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
});

function InfoCardExpand(props) {
  const {classes, title, subheader, content} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        onClick={handleExpandClick}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        }
        title={title}
        subheader={subheader}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {content}
        </CardContent>
      </Collapse>
    </Card>
  );
}

InfoCardExpand.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
};

export default withStyles(styles)(InfoCardExpand);