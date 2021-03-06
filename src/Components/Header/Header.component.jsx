import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logoutNowThunk } from "../../Redux/actions";
import { useHistory } from "react-router-dom";

import "./Header.style.scss";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MoreIcon from "@material-ui/icons/MoreVert";
import Logo from "../../Assets/Images/logo.png";
import { Popover } from "@material-ui/core";
import FilterMenu from "../FilterMenu/FilterMenu.components";
//for Redux
import { useSelector, useDispatch } from "react-redux";
import { search } from "../../Redux/Actions/Searchaction";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  submitButton: {
    marginLeft: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
  filter: {
    display: "none",
    zIndex: 1000,
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionMobile2: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const PrimarySearchAppBar = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filterMenu, setFilterMenu] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [who, setWho] = React.useState("");
  const [name, setName] = React.useState("");

  const dispatch = useDispatch();

  //Mobile menu handle dropdown (for nav icons)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //Filter menu handle dropdown

  const menuOpen = Boolean(filterMenu);

  const handleFilterMenuClose = () => {
    setFilterMenu(null);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenu(event.currentTarget);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let different = localStorage.getItem("filter");
    //let a = await Axios.get(`http://localhost:5000/api/search/${different}/${event.target[0].value}`)
    localStorage.setItem(
      "searchlink",
      `http://localhost:5000/api/search/${different}/${event.target[0].value}`
    );
    let searchgglink = localStorage.getItem('searchlink')
    dispatch(search(searchgglink));

    history.push("/CouponSearch");
  };

  // Profile menu dropdown

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    props.logoutRedux();
  };

  const toProfile = (event) => {
    event.preventDefault();
    if (who === "user") {
      history.push(`/UserProfiles/${name}`);
    } else if (who === "business") {
      history.push(`/BusinessProfiles/${name}`);
    }
    handleMenuClose();
  };

  const toHome = (event) => {
    event.preventDefault();
    history.push("/HomePage");
  };

  const toCoupon = (event) => {
    event.preventDefault();
    history.push(`/MyCouponPage/${name}`);
  };

  useEffect(() => {
    let x = localStorage.getItem("ob_who");
    let y = localStorage.getItem("ob_username");
    setWho(x);
    setName(y);
  }, [who, name]);

  // Profile menu dropdown render

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={toProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Popover>
  );

  //Mobile Menu render (for nav icons)

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={toHome}>
        <IconButton color="inherit">
          <Badge color="secondary">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={toCoupon}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <LocalOfferIcon />
          </Badge>
        </IconButton>
        <p>Coupons</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  //Filter Menu render

  const renderFilterMenu = (
    <Popover
      className={classes.sectionMobile2}
      anchorEl={filterMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={menuOpen}
      onClose={handleFilterMenuClose}
    >
      <FilterMenu />
    </Popover>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} className="Logo" alt="Logo" />

          {/* SearchBar */}

          <form onSubmit={handleSubmit} className="searchBar">
            <div className={classes.search}>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            {/* Mobile SearchBar */}

            <div className={classes.sectionMobile2}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleFilterMenuOpen}
              >
                <Fab size="medium" color="secondary" aria-label="add">
                  <AddCircleIcon />
                </Fab>
              </IconButton>
              <IconButton edge="end" color="inherit">
                <Fab size="medium" color="primary" aria-label="add">
                  <SearchIcon />
                </Fab>
              </IconButton>
            </div>

            {/* Search Filters (Dropdown) */}

            <div className={classes.filter}>
              <FilterMenu />
              <Button
                type="submit"
                startIcon={<SearchIcon />}
                className={classes.submitButton}
                size="medium"
                variant="contained"
                color="primary"
              >
                {" "}
                Search
              </Button>
            </div>
          </form>

          {/* Nav Icons */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton edge="end" color="inherit" onClick={toHome}>
              <Fab size="medium" color="primary" aria-label="add">
                <HomeIcon />
              </Fab>
            </IconButton>
            <IconButton edge="end" color="inherit" onClick={toCoupon}>
              <Fab size="medium" color="primary" aria-label="add">
                <Badge color="secondary">
                  <LocalOfferIcon />
                </Badge>
              </Fab>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Fab size="medium" color="primary" aria-label="add">
                <AccountCircle />
              </Fab>
            </IconButton>
          </div>

          {/* Mobile dropdown for nav icons */}

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderFilterMenu}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => {
      dispatch(logoutNowThunk());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimarySearchAppBar);
