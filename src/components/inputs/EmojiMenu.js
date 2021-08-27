import React from "react";
import PropTypes from "prop-types";
import emojiList from '../../assets/emojis/emojiList.js';

// Import Mui components
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Import custom components
import Button from '../buttons/Button';
import SearchInput from './EmojiSearchInput';

// Import icons
import {FaRegSmile,
        FaHeart, 
        FaHandPaper,
        FaUser,
        FaDog,
        FaPizzaSlice,
        FaCarSide,
        FaSadCry} from 'react-icons/fa';

const ListItemTextMemo = React.memo(ListItemText);
const MenuItemMemo = React.memo(MenuItem);
const emojiCategories = Object.keys(emojiList);
const categoryIcons = [ <FaRegSmile/>, 
                        <FaHeart/>, 
                        <FaHandPaper/>, 
                        <FaUser/>,
                        <FaDog />, 
                        <FaPizzaSlice/>, 
                        <FaCarSide/> ];


const styles = (theme) => ({
  menuRoot: {
    '& .MuiList-padding': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      width: "300px",
      borderRadius: 2,
    },
    '& .MuiPopover-paper': {
      width: "300px",
      height: "250px",
    },
    '& .MuiAccordion-root': {
      '&:before': {
        top: 0,
        height: 0,
      },
    },
    '& .MuiAccordion-root.Mui-expanded': {
      maxHeight: "none",
      minHeight: "none",
      margin: "0",
    },
    '& .MuiAccordionSummary-root': {
      display: "inline-flex",
      minHeight: 0,
      '& .MuiAccordionSummary-expandIcon': {
        transform: 'rotate(-90deg)',
      },
      '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
        transform: 'rotate(0deg)',
      },
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: "1px",
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
      padding: 0,
      '& .MuiTypography-body1': {
        color: theme.palette.white.dark,
        fontSize: "14px",
      },
    },
    '& .MuiIconButton-root': {
      color: theme.palette.white.dark,
      fontSize: "14px",
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: 0,
      padding: 0,
    },
    '& .MuiMenuItem-root': {
      float: "left",
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
    '& .MuiTypography-displayBlock': {
      fontSize: "25px",
    },
    '& .MuiListItem-gutters': {
      padding: "0 5px 0 5px",
    },
  },
  toneMenuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      borderRadius: 2,
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
    '& .MuiMenuItem-root': {
      fontSize: "25px",
    },
    '& .MuiListItem-gutters': {
      padding: "0 5px 0 5px",
    },
  },
  accordion: {
    backgroundColor: "inherit", 
    color: theme.palette.white.dark,
    margin: 0,
    border: 0,
  },
  spacer: {
    height: "50px",
  },
  headerContainer: {
    position: "absolute",
    height: "50px",
    width: "300px",
  },
  header: {
    padding: "5px 0",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    zIndex: 10,
    height: "inherit",
    width: "inherit",
    backgroundColor: theme.palette.gray.dark,
    color: theme.palette.white.dark,
  },
  searchBar: {
    width: "80%",
    textAlign: "center",
    padding: "0 10px",
  },
  tonePicker: {
    width: "20%",
    textAlign: "left",
  },
  footerContainer: {
    position: "absolute",
    height: "40px",
    width: "300px",
  },
  footer: {
    display: "flex",
    position: "fixed",
    zIndex: 10,
    height: "inherit",
    width: "inherit",
    padding: "0 20px",
    marginTop: "160px",
    alignItems: "center",
    backgroundColor: theme.palette.gray.dark,
    color: theme.palette.white.dark,
  },
  footerEmoji: {
    float: "left",
    fontSize: "25px",
  },
  footerEmojiName: {
    float: "left",
    fontSize: "14px",
  },
  button: {
    fontSize: "25px",
  },
  emptySearchContainer: {
    width: "inherit",
    height: "inherit",
    paddingTop: "15px",
    textAlign: "center",
  },
  emptySearchMessage: {
    color: theme.palette.white.dark,
  },
  sadIcon: {
    fontSize: "100px",
    color: theme.palette.gray.light,
  },
});

// Return array of eomji objects where provided value param
// is found inside emoji object.name property
function searchEmoji (value) {
  let results = [];

  for (let i=0; i < emojiCategories.length; i++) {
    for(let j=0; j < emojiList[emojiCategories[i]].length; j++) {
      if(emojiList[emojiCategories[i]][j].name.search(value) > -1) {
        results.push(emojiList[emojiCategories[i]][j]);
      }
    }
  }

  if(results.length < 1) {
    results = 'none';
  }
  return results;
}

function EmojiMenu (props) {
  const [expanded, setExpanded] = React.useState(false);
  const [toneAnchorEl, setToneAnchorEl] = React.useState(false);
  const [tone, setTone] = React.useState(null);
  const [hoverEmoji, setHoverEmoji] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState(false);
  const {classes, anchorEl, handleClose, insertValue} = props;

  const handleToneClick = (event) => {
    setToneAnchorEl(event.currentTarget);
  };

  const handleToneClose = () => {
    setToneAnchorEl(false);
  };

  const handleToneSelect = (tone) => {
    setTone(tone);
    handleToneClose();
  }

  const handleEmojiOver = React.useCallback(
    (emoji, name) => {
      setHoverEmoji({
        "emoji": emoji, 
        "name": name,
      })
    },
  []);
     
  const handleEmojiOut = React.useCallback(
    () => {setHoverEmoji(null)}, 
  []);

  const returnCodedEmoji = React.useCallback((emojiCodes, toneBool, tone) => {
    let codes = emojiCodes.slice(0);

    if(toneBool && tone) {
      codes.splice(1, 0, tone);
    } 

    let emoji = '';

    for (let i=0; i < codes.length; i++) {
      emoji += String.fromCodePoint(parseInt(codes[i], 16));
    }

    return emoji;
  }, []);

  const handleSearch = (value) => {
    setSearchInput(value);
    if (value.trim().length > 0) {
      const result = searchEmoji(value.trim());
      // Fix potential UI bug where hoverEmoji value
      // would remain set after sudden render change
      if (result === 'none') {
        setHoverEmoji(null);
      }
      setSearchResults(result);
    } else {
      setSearchResults(false);
    }
  }

  const handleSearchClear = () => {
    setSearchInput('');
    setSearchResults(false);
  }

  const handleEmojiClick = React.useCallback((value) => {
    setHoverEmoji(null);
    setSearchResults(false);
    setExpanded(null);
    insertValue(value);
    handleClose();
  }, [handleClose, insertValue]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCloseMenu = () => {
    setSearchInput('');
    setSearchResults(false);
    setExpanded(null);
    handleClose();
  }

  const returnCategories = () => {
    return (
      emojiCategories.map((category, pos) => {
        return (
          <Accordion
            key={`${category}-${pos}`}
            expanded={expanded === category}
            onChange={handleAccordionChange(category)}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${category}-content`}
              id={`${category}-header`}
            >
              <Typography>
                {categoryIcons[pos]} &nbsp;&nbsp;&nbsp; {category}
              </Typography>
            </AccordionSummary>
            {(expanded === category) &&
              <AccordionDetails>
                <div>
                  {emojiList[category].map((item, pos) => {
                    return (
                      <MenuItemMemo
                        key={`${pos}-${item}`} 
                        onClick={() => handleEmojiClick(returnCodedEmoji(item.code, item.toned, tone))}
                      >
                        <ListItemTextMemo
                          onMouseOver={() => handleEmojiOver(returnCodedEmoji(item.code, item.toned, tone), item.name)}
                          onMouseOut={handleEmojiOut} 
                          primary={returnCodedEmoji(item.code, item.toned, tone)} 
                        />
                      </MenuItemMemo>
                    );
                  })}
                </div>
              </AccordionDetails>
            }
          </Accordion>
        );
      })
    );
  }

  const returnSearchResults = () => {
    
    if (searchResults === "none") {
      return (
        <div className={classes.emptySearchContainer}>
          <FaSadCry className={classes.sadIcon}/>
          <div className={classes.emptySearchMessage}>
            No emojis match your search
          </div>
        </div>
      );
    };

    return (
      searchResults.map((item, pos) => {
        return (
          <MenuItemMemo
            key={`${pos}-${item}`} 
            onClick={() => handleEmojiClick(returnCodedEmoji(item.code, item.toned, tone))}
          >
            <ListItemTextMemo
              onMouseOver={() => handleEmojiOver(returnCodedEmoji(item.code, item.toned, tone), item.name)}
              onMouseOut={handleEmojiOut} 
              primary={returnCodedEmoji(item.code, item.toned, tone)} 
            />
          </MenuItemMemo>
        );
      })
    );
  }

  return (
    <Menu
      id="role-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      className={classes.menuRoot}
      elevation={3}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <div className={classes.searchBar}>
            <SearchInput 
              id={'search-emoji'} 
              searchInput={searchInput} 
              onChange={(e) => handleSearch(e.target.value)} 
              handleSearchClear={handleSearchClear} 
            />
          </div>
          <div className={classes.tonePicker}>
            <Button 
              className={classes.button}
              onClick={handleToneClick}
              round 
              justIcon
              >
                {`\u{1F44F}${tone ? String.fromCodePoint(parseInt(tone, 16)) : ''}`}
            </Button>
            <Menu
              id="tone-menu"
              anchorEl={toneAnchorEl}
              open={Boolean(toneAnchorEl)}
              onClose={handleToneClose}
              className={classes.toneMenuRoot}
              elevation={3}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={() => handleToneSelect(false)}>{'\u{1F44F}'}</MenuItem>
              <MenuItem onClick={() => handleToneSelect('1F3FB')}>{'\u{1F44F}\u{1F3FB}'}</MenuItem>
              <MenuItem onClick={() => handleToneSelect('1F3FC')}>{'\u{1F44F}\u{1F3FC}'}</MenuItem>
              <MenuItem onClick={() => handleToneSelect('1F3FD')}>{'\u{1F44F}\u{1F3FD}'}</MenuItem>
              <MenuItem onClick={() => handleToneSelect('1F3FE')}>{'\u{1F44F}\u{1F3FE}'}</MenuItem>
              <MenuItem onClick={() => handleToneSelect('1F3FF')}>{'\u{1F44F}\u{1F3FF}'}</MenuItem>
            </Menu>
          </div>    
        </div>
      </div>
      <div className={classes.spacer} />
      <div className={classes.footerContainer}>        
        {hoverEmoji 
          ? <div className={classes.footer}>
              <div className={classes.footerEmoji}>
                {hoverEmoji.emoji} &nbsp;
              </div>
              <div className={classes.footerEmojiName}>
                {hoverEmoji.name}
              </div> 
            </div>
          : <div className={classes.footer} />
        }
      </div>
      {searchResults
        ? returnSearchResults()
        : returnCategories()
      }
      <div className={classes.spacer} />
    </Menu>
  );
}

EmojiMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  insertValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmojiMenu);