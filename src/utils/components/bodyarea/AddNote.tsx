import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, InputBase, Collapse, Button } from "@material-ui/core";
import { useTodosStore } from "../../providers/todoStore";
import moment from "moment";

interface NoteProps {
  lastElement: number | null;
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column"
  },
  inputTitleRoot: {
    padding: theme.spacing(1.25, 2)
  },
  inputTitleInput: {
    fontWeight: 500,
    fontSize: "1rem",
    padding: 0,
    lineHeight: "1rem",
    verticalAlign: "middle",
    color: theme.palette.text.primary
  },
  inputNoteRoot: {
    padding: theme.spacing(1.5, 2)
  }
}));

const AddNote: React.FC<NoteProps> = (props: NoteProps) => {
  const classes = useStyles();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { dispatch } = useTodosStore();
  const [notes, setNotes] = useState<string>("");

  const handleCreate = (data: any) => {
    dispatch({
      type: "CREATED",
      payload: {
        id: props.lastElement,
        data: data,
        isCompleted: false,
        created_time: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
      }
    });
    setNotes("");
  };

  return (
      <Paper elevation={2}>
        <InputBase
          placeholder={"Take a note..."}
          classes={{
            root: isFocused ? classes.inputTitleRoot : classes.inputNoteRoot,
            input: classes.inputTitleInput
          }}
          style={{width: '100%'}}
          onFocus={() => {
            setIsFocused(true);
          }}
          inputProps={{ "aria-label": "note title" }}
          value={notes}
          onChange={(event) => {
            setNotes(event.target.value);
          }}
          onKeyUp={(event: any) => {
            if (event.keyCode === 13) {
              handleCreate(event.target.value);
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleCreate(notes);
          }}
        >
          Submit
        </Button>
      </Paper>
  );
};

export default AddNote;
