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
import { deleteTeam } from "./TeamFunctions";
import MyTeamForm from "./MyTeamForm";
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const DeleteTeam = (id) => {
  const token = localStorage.usertoken;
  deleteTeam(id, token).then((res) => {});
};

const MyTeam = (props) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  const EditTeam = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Card className="card" style={{ display: "block", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.region}
          </Typography>

          {/* {props.members.map((member) => (
            <div>
              <h3>Name: {member.nameMember}</h3>
              <h3>Rank: {member.rankMember}</h3>
              <br></br>
            </div>
          ))} */}
        </CardContent>

        <CardActions>
          <IconButton aria-label="edit" onClick={() => EditTeam(props.id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => DeleteTeam(props.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton
            aria-label="Leaderboar"
            // onClick={() => ConfirmOrder(props)}
          >
            <GamesIcon />
          </IconButton>
        </CardActions>

        <div style={{ display: isEdit ? "block" : "none" }}>
          <MyTeamForm
            update={true}
            id={props.id}
            name={props.name}
            region={props.region}
          />
        </div>
      </Card>
    </div>
  );
};
export default MyTeam;
