import React, { useState } from "react";
import { Consumer } from "../store";
import { Grid, FormControl, InputLabel, Select } from "@material-ui/core";
import Idea from "./Idea";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  select: {
    minWidth: 200,
    marginBottom: 15
  }
});

export default function Ideas() {
  const { select } = useStyles();
  const [sortValue, setSortValue] = useState("date");

  const onFiltered = e => {
    setSortValue(e.target.value);
  };

  const sortIdeas = (ideaA, ideaB) => {
    if (sortValue === "date") {
      return ideaB.created_date - ideaA.created_date;
    }
    return ideaA.title.localeCompare(ideaB.title);
  };

  return (
    <Consumer>
      {({ ideas }) => (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={select}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Sort By
              </InputLabel>
              <Select
                native
                value={sortValue}
                onChange={onFiltered}
                inputProps={{
                  name: "sort"
                }}
              >
                <option value="title">Title</option>
                <option value="date">Created date</option>
              </Select>
            </FormControl>
          </Grid>
          {ideas &&
            ideas.length > 0 &&
            ideas.sort(sortIdeas).map(idea => (
              <Grid item key={idea.id}>
                <Idea info={idea} />
              </Grid>
            ))}
        </Grid>
      )}
    </Consumer>
  );
}
