import React from "react";
import "./GameCard.css";
const GameCard = (props) => {
  return (
    <React.Fragment>
      <div className="card-container">
        <h5 className="card-header">{props.game.title}</h5>
        <img className="card-img" src={`${props.game.img}`} alt="LOL"></img>
      </div>
    </React.Fragment>
  );
};
export default GameCard;
