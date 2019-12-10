import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import dayjs from "dayjs";
import { Card, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import { Consumer } from "../store";

const useStyles = makeStyles({
  common: {
    padding: 8
  },
  readOnly: {
    margin: "0 0 4px 0",
    fontSize: "0.8rem",
    paddingLeft: 8
  },
  input: {
    background: "transparent",
    margin: 5,
    width: "calc(100% - 10px)",
    outline: "none",
    border: "none",
    color: "#fff",
    padding: "2px 40px 2px 4px",
    fontSize: "1rem",
    fontFamily: "Roboto",
    fontWeight: "normal",
    "&:focus": {
      border: "1px solid grey",
      margin: 4
    }
  },
  bodyContainer: {
    position: "relative",
    "& .counter": {
      position: "absolute",
      color: red[500],
      right: 0,
      top: 0,
      height: "100%",
      width: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  root: {
    width: 150,
    height: 150,
    justifyContent: "flex-start",
    padding: "8px 2px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    "& .card-actions": {
      position: "absolute",
      bottom: 0,
      right: 0,
      padding: 8,
      minHeight: 60
    },
    "& .card-actions__delete": {
      display: "none"
    },
    "&:hover .card-actions__delete": {
      display: "inherit"
    }
  }
});

export default function Idea({ info }) {
  const { bodyContainer, root, input, readOnly } = useStyles();

  const [title, setTitle] = useState("");
  const [isTitleDirty, setIsTitleDirty] = useState(false);
  const [body, setBody] = useState("");
  const [isBodyDirty, setIsBodyDirty] = useState(false);

  useEffect(() => {
    const { title: ideaTitle, body: ideaBody } = info;

    setTitle(ideaTitle);
    setIsTitleDirty(false);

    setBody(ideaBody);
    setIsBodyDirty(false);
  }, [info]);

  const onTitleChange = e => {
    setIsTitleDirty(true);
    setTitle(e.target.value);
  };

  const onBodyChange = e => {
    setIsBodyDirty(true);
    setBody(e.target.value);
  };

  const updatedIdea = {
    ...info,
    updated_at: Date.now(),
    title,
    body
  };

  const onInputBlur = updateIdea => () => {
    if (isTitleDirty || isBodyDirty) {
      updateIdea(updatedIdea);
    }
  };

  const charactersLeft = 140 - body.length;

  return (
    <Consumer>
      {({ deleteIdea, updateIdea, activeIdea, setActiveIdea }) => (
        <Card className={root} onClick={() => setActiveIdea(info)}>
          <p className={readOnly}>{info.id}</p>
          <div>
            <input
              type="text"
              autoFocus={activeIdea.id === info.id}
              className={input}
              name="title"
              label="Title"
              value={title}
              onChange={onTitleChange}
              onBlur={onInputBlur(updateIdea)}
            />
          </div>
          <div className={bodyContainer}>
            <input
              type="text"
              className={input}
              name="body"
              label="Body"
              value={body}
              onChange={onBodyChange}
              onBlur={onInputBlur(updateIdea)}
              maxLength="140"
            />
            {charactersLeft < 15 && activeIdea.id === info.id && (
              <div className="counter">{charactersLeft}</div>
            )}
          </div>
          <p className={readOnly}>
            {dayjs(info.created_date).format("D-MMM-YY h:mm:s A")}
          </p>
          <div className="card-actions">
            <IconButton
              className="card-actions__delete"
              color="secondary"
              aria-label="delete"
              onClick={async () => await deleteIdea(info.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </Card>
      )}
    </Consumer>
  );
}
