import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface DrawerItemProps {
  text: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  listItemRoot: {
    borderRadius: 10
  },
  listItemSelected: {
    backgroundColor: `#feefc3 !important`
  }
}));

const DrawerItem: React.FC<DrawerItemProps> = (props: DrawerItemProps) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      selected={props.isSelected}
      classes={{
        selected: classes.listItemSelected,
        root: classes.listItemRoot
      }}
      onClick={props.onClick}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};

export default DrawerItem;
