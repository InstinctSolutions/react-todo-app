import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  ClickAwayListener,
  Box,
  InputBase,
  IconButton
} from "@material-ui/core";
import {
  Search as SearchIcon,
  CloseOutlined as CloseOutlinedIcon
} from "@material-ui/icons";
import { useTodosStore } from "../../providers/todoStore";

interface SearchBarProps {
  onSearchClose: () => void;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  search: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: theme.spacing(1)
  },
  searchIcon: {
    width: theme.spacing(7),
    color: "black",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    flex: 1,
    alignItems: "center"
  },
  inputInput: {
    width: "100%"
  }
}));

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setFocused] = useState<boolean>(false);
  const { state, handleSearchData } = useTodosStore();

  const searchDataOperation = (terms: string) => {
    if (!state) {
      return;
    }

    const newData = state.filter(({ data }) => data.includes(terms));
    if (newData.length === 0) {
      handleSearchData([]);
    } else {
      handleSearchData(newData);
    }
    return newData;
  };

  const onSearch = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFocused(true);
    setFocused(false);
    searchDataOperation(searchTerm);

    if (event.key === "Backspace") {
      setFocused(false);
      if (searchTerm === "") {
        searchDataOperation("");
      }
    }
  };

  const onSearchCancel = () => {
    setSearchTerm("");
    handleSearchData(state);
    setFocused(false);
    props.onSearchClose();
  };

  const onFocusLoss = () => {
    props.onSearchClose();
    setFocused(false);
  };

  return (
    <ClickAwayListener onClickAway={onFocusLoss}>
      <Box
        className={classes.search}
        borderRadius={"0.5rem"}
        height={"3rem"}
        bgcolor={isFocused ? "#FFF" : "#F1F3F4"}
        boxShadow={isFocused ? 2 : 0}
      >
        <Box component="div" className={classes.searchIcon}>
          <SearchIcon />
        </Box>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          value={searchTerm}
          onClick={() => setFocused(true)}
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onKeyUp={onSearch}
        />
        {isFocused ? (
          <IconButton hidden={!isFocused} onClick={onSearchCancel}>
            <CloseOutlinedIcon htmlColor={"#5f6368"} />
          </IconButton>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
