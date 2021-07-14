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
});

export {styles}