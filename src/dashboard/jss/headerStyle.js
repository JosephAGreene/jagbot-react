const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  bar: {
    backgroundColor: theme.palette.gray.main,
  },
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
    color: theme.palette.yellow.main,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  menuPaper: {
    backgroundColor: theme.palette.gray.dark,
    border: `1px solid ${theme.palette.gray.light}`,
    borderRadius: 0,
  },
  menuItemRoot: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  menuIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
});

export {styles}