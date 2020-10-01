import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";
import { useGeneralStore } from "../../providers/generalStore";
import AddNote from "./AddNote";
import { useTodosStore } from "../../providers/todoStore";
import TodoList from "./TodoList";
import { Item } from "../../types/";
import { isEmpty } from "lodash";

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(5)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(10)
      },
      width: "100%",
      height: "100%"
    }
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 280 - theme.spacing(2.5),
    marginRight: -1 * theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const NotesArea: React.FC = () => {
  const classes = useStyles();
  const { state, dispatch, searchData } = useTodosStore();
  const { isNavBarOpen } = useGeneralStore();

  const toggleTodo = (selectedTodo: number) => {
    const newTodo = state.find((todo: Item) => todo.id === selectedTodo);
    dispatch({
      type: "UPDATED",
      payload: { ...newTodo, isCompleted: !newTodo.isCompleted }
    });
  };

  const handleDelete = (selectedTodo: number) => {
    const newTodo = state.find((todo: Item) => todo.id === selectedTodo);
    dispatch({ type: "DELETED", payload: newTodo });
  };
  return (
    <div className={!isNavBarOpen ? classes.contentShift : classes.content}>
      <div className={classes.root}>
        <Paper elevation={3}>
          <AddNote
            lastElement={
              !state ? 0 : state.length < 1 ? 0 : state[state.length - 1].id + 1
            }
          />
          <Grid container>
            {!searchData && null}
            {searchData.length > 0 && !isEmpty(searchData[0])
              ? searchData.map((item: any, key: number) => {
                  return (
                    <Grid item xs={12} key={key}>
                      <TodoList
                        item={item}
                        toggleTodo={toggleTodo}
                        handleDelete={handleDelete}
                      />
                    </Grid>
                  );
                })
              : !state
              ? null
              : state.map((item: Item, key: number) => {
                  return (
                    <Grid item xs={12} key={key}>
                      <TodoList
                        item={item}
                        toggleTodo={toggleTodo}
                        handleDelete={handleDelete}
                      />
                    </Grid>
                  );
                })}
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default NotesArea;
