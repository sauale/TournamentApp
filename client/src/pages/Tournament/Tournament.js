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
import "./Tournament.css";
import { deleteTournament } from "./TournamentFunctions";
import { confirmAlert } from "react-confirm-alert";
import TournamentForm from "./TournamentForm";
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const Tournament = (props) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const EditProduct = () => {
    setIsEdit(!isEdit);
  };

  const DeleteTournament = (id) => {
    const token = localStorage.usertoken;
    setDeleted(true);
    deleteTournament(id, token).then((res) => {});
  };
  return (
    <div>
      <Card className="card" style={{ display: deleted ? "none" : "block" }}>
        <CardContent>
          {/* OpenProductPage */}
          <Link to={"/Tournaments/" + props.id}>
            <Typography variant="h5" component="h2">
              {props.name}
            </Typography>
          </Link>
          <Typography className={classes.pos} color="textSecondary">
            {props.region}
          </Typography>

          <Typography variant="body2" component="p">
            {props.format}
          </Typography>
        </CardContent>

        <CardActions>
          {props.role == "ADMIN" && (
            <IconButton aria-label="edit" onClick={EditProduct}>
              <EditIcon />
            </IconButton>
          )}
          {props.role == "ADMIN" && (
            <IconButton
              aria-label="delete"
              onClick={() => DeleteTournament(props.id)}
            >
              <DeleteIcon />
            </IconButton>
          )}

          <IconButton
            aria-label="Leaderboar"
            // onClick={() => ConfirmOrder(props)}
          >
            <GamesIcon />
          </IconButton>
        </CardActions>

        <div style={{ display: isEdit ? "block" : "none" }}>
          <TournamentForm
            update={true}
            id={props.id}
            name={props.name}
            region={props.region}
            format={props.format}
            teamCount={props.teamCount}
            map={props.map}
            entryCost={props.entryCost}
            prizePool={props.prizePool}
          />
        </div>
      </Card>
    </div>
  );
};
export default Tournament;
