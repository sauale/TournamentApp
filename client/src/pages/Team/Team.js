import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import GamesIcon from "@material-ui/icons/Games";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link, useHistory } from "react-router-dom";
import "./Team.css";
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const Team = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Card className="card" style={{ display: "block" }}>
        <CardContent>
          {/* OpenProductPage */}
          <Link to={"/Teams/" + props.id}>
            <Typography variant="h5" component="h2">
              {props.name}
            </Typography>
          </Link>
          <Typography className={classes.pos} color="textSecondary">
            {props.region}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default Team;
