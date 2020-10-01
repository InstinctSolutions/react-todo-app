import React from "react";
import { Drawer, useTheme, useMediaQuery, List } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { useGeneralStore } from "../../providers/generalStore";
import DrawerItem from "./DrawerItem";
import { WbIncandescentOutlined as IdeaIcon } from "@material-ui/icons";
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  drawer: {
    width: 230,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      zIndex: 1100
    }
  },
  drawerPaper: {
    background: "#FFF",
    width: 230,
    border: 0
  },
  sectionTitle: {
    padding: "16px 8px 0 16px",
    color: "black"
  },
  toolbar: {
    minHeight: 65
  }
}));

const NavDrawer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const {
    isNavBarOpen,
    selectedLabelId,
    toggleNavBar,
    handleSelectedLabelId
  } = useGeneralStore();

  const onDrawerItemSelected = (labelId: string) => {
    handleSelectedLabelId(labelId);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={isNavBarOpen}
      onClose={toggleNavBar}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <DrawerItem
          text={"Notes"}
          isSelected={selectedLabelId === ""}
          icon={<IdeaIcon htmlColor={"#5f6368"} />}
          onClick={() => onDrawerItemSelected("")}
        />
      </List>
    </Drawer>
  );
};

export default NavDrawer;
