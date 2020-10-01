import React from "react";
import {
  makeStyles,
  Theme,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton
} from "@material-ui/core";
import { Item } from "../../types/";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyle = makeStyles<Theme>((theme: Theme) => ({
  bodyarea: {
    display: "row"
  },
  formControl: {
    margin: theme.spacing(1)
  }
}));

interface TodoProps {
  item: Item;
  toggleTodo: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TodoList: React.FC<TodoProps> = (props: TodoProps) => {
  const classes = useStyle();
  if (!props.item) {
    return null;
  }
  // console.log(props);
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.item.isCompleted}
              onClick={() => {
                props.toggleTodo(props.item.id);
              }}
              name={"checked" + props.item.id.toString()}
              color="primary"
            />
          }
          label={
            <>
              <div style={{ wordWrap: "break-word", wordBreak: "break-all" }}>
                {props.item.isCompleted && <s>{props.item.data}</s>}
                {!props.item.isCompleted && props.item.data}
                <span style={{ position: "relative", right: 0 }}>
                  <IconButton
                    onClick={() => props.handleDelete(props.item.id)}
                  >
                    <DeleteIcon style={{ fontSize: 15 }} />
                  </IconButton>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 8 }}>{props.item.created_time}</span>
              </div>
            </>
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default TodoList;
