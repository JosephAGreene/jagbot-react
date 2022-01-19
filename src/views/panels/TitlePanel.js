import React from 'react';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Import custom components
import GridContainer from '../../components/grid/GridContainer';
import GridItem from '../../components/grid/GridItem';
import Button from '../../components/buttons/Button';
import ResponsiveDialog from '../../components/dialogs/ResponsiveDialog';

// Import icons
import { SiReadthedocs } from 'react-icons/si';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const styles = (theme) => ({
  paper: {
    padding: "20px",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.gray.main,
    overflow: "hidden",
    color: theme.palette.white.main,
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    backgroundColor: theme.palette.gray.main,
  },
  title: {
    color: theme.palette.white.main,
    fontSize: 28,
    width: "100%",
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
    },
  },
  description: {
    color: theme.palette.white.dark,
  },
  list: {
    marginTop: theme.spacing(1),
    '& .MuiListItemText-root': {
      padding: 0,
    },
    '& .MuiListItem-gutters': {
      padding: 0,
    },
    '& .MuiListItemIcon-root': {
      minWidth: "unset !important",
      color: theme.palette.error.light,
    },
  },
  documentButton: {
    color: theme.palette.teal.main,
    '& .MuiIconButton-root': {
      padding: "0px",
    }
  },
});

function TitlePanel(props) {
  const { classes, title, description, listItems, Icon, image, docs, color } = props;
  const [docsDialog, setDocsDialog] = React.useState(false);

  const returnDocsButton = () => {
    if (docs && docs.length > 0) {
      return (
        <Button
          justIcon
          round
          size="lg"
          color="teal"
          onClick={() => setDocsDialog(true)}
        >
          <SiReadthedocs />
        </Button>
      );
    }
  }

  const returnDocsDialog = () => {
    if (docs && docs.length > 0) {
      return (
        <ResponsiveDialog
          open={docsDialog}
          keepMounted={true}
        >
          {docs.map((document, index) => {
            return <div key={index}> {document} </div>;
          })}
          <GridContainer>
            <GridItem xs={12} right>
              <Button color="orange" onClick={() => setDocsDialog(false)}>Close</Button>
            </GridItem>
          </GridContainer>
        </ResponsiveDialog>
      );
    }
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12}>
          <Paper elevation={2} className={classes.paper} >
            <Hidden smUp>
              <div className={classes.title}>
                {title}
              </div>
              <GridContainer justifyContent="flex-start">
                <GridItem>
                  {image
                    ? <Avatar className={classes.avatar} variant="rounded" src={image} />
                    : <Avatar className={classes.avatar} style={{ "color": color }} variant="rounded" component={Icon} />
                  }
                </GridItem>
                <GridItem xs>
                  <div className={classes.description}>
                    {description}
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.spacer} />
              <GridContainer justifyContent="space-between" alignItems="flex-end">
                <GridItem xs left>
                  {listItems &&
                    <List className={classes.list} dense>
                      {listItems.map((item, pos) => {
                        return (
                          <ListItem key={`${item}-${pos}`}>
                            <ListItemIcon>
                              <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        )
                      })}
                    </List>
                  }
                </GridItem>
                <GridItem>
                  {returnDocsButton()}
                </GridItem>
              </GridContainer>
            </Hidden>
            <Hidden xsDown>
              <GridContainer>
                <GridItem>
                  {image
                    ? <Avatar className={classes.avatar} variant="rounded" src={image} />
                    : <Avatar className={classes.avatar} style={{ "color": color }} variant="rounded" component={Icon} />
                  }
                </GridItem>
                <GridItem xs>
                  <div className={classes.title}>
                    {title}
                  </div>
                  <div className={classes.description}>
                    {description}
                  </div>
                </GridItem>
                <GridItem>
                  {returnDocsButton()}
                </GridItem>
                <GridItem xs={12}>
                  {listItems &&
                    <List className={classes.list} dense>
                      {listItems.map((item, pos) => {
                        return (
                          <ListItem key={`${item}-${pos}`}>
                            <ListItemIcon>
                              <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        )
                      })}
                    </List>
                  }
                </GridItem>
              </GridContainer>
            </Hidden>
          </Paper>
        </GridItem>
      </GridContainer >
      {returnDocsDialog()}
    </>
  );
}

TitlePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  listItems: PropTypes.array,
  docs: PropTypes.array,
  Icon: PropTypes.elementType,
  image: PropTypes.string,
  color: PropTypes.string,
};

export default withStyles(styles)(TitlePanel);