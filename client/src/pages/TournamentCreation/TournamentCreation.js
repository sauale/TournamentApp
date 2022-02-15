import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import GameCard from "./GameCard";
import "./TournamentCreation.css";
const TournamentCreation = (props) => {
  const Games = [
    {
      title: "League of Legends",
      img: "/GameCards/LOL.jpg",
    },
    {
      title: "CS:GO",
      img: "/GameCards/CSGO.jpg",
    },
    {
      title: "Rocket League",
      img: "/GameCards/ROCKETLEAGUE.jpg",
    },
  ];
  useEffect(() => {
    const token = localStorage.usertoken;
    if (!token) {
      window.location.href = "/sign-up";
    }
  }, []);

  return (
    <React.Fragment>
      <h1 className="page-header">Choose a game</h1>

      {Games.map((game) => (
        <GameCard game={game} />
      ))}
    </React.Fragment>
  );
};

export default TournamentCreation;
