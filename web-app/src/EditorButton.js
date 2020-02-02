import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

export default function EditorButton() {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push("/editor");
  };

  return (
    <Fab size="large" color="secondary" onClick={handleClick} className={classes.fab}>
      <AddIcon />
    </Fab>
  );
}
