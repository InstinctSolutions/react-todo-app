import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  useScrollTrigger,
  Toolbar,
  IconButton,
  Box
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useGeneralStore } from "../../providers/generalStore";
import SearchBar from "../appbar/SearchBar";

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    zIndex: 1200,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "white"
    }
  },
  containerBorder: {
    zIndex: 1200,
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.palette.divider
  },
  menuButton: {
    marginRight: "8px"
  },
  searchbarContainer: {
    flexGrow: 0,
    width: theme.spacing(90),
    marginLeft: theme.spacing(9)
  }
}));

const AppBarContainer: React.FC = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  const { toggleNavBar } = useGeneralStore();

  const [isSearchShowing, setSearchShowing] = useState<boolean>(false);
  return (
    <>
      <div className={classes.root}>
        <AppBar
          elevation={trigger ? 4 : 0}
          className={trigger ? undefined : classes.containerBorder}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="open drawer"
              onClick={toggleNavBar}
            >
              <MenuIcon htmlColor={"#5f6368"} />
            </IconButton>
            <Box component={"div"} className={classes.searchbarContainer}>
              <SearchBar
                onSearchClose={() => {
                  setSearchShowing(false);
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default AppBarContainer;
