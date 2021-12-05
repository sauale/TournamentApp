import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Team from "./Team";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "./TeamsPage.css";
import axios from "axios";
const TeamsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/Teams")
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch(() => {
        alert("ERROR");
      });
  }, []);

  const [isAddClicked, setIsAddClicked] = useState(false);

  const CreateProduct = () => {
    setIsAddClicked(true);
  };
  const onAddClose = () => {
    setIsAddClicked(false);
  };

  return (
    <div>
      <Paper
        className="paper"
        elevation={3}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="centerAddNew">
          <h1>Teams List</h1>

          <div
            style={{
              maxWidth: "300px",
              display: isAddClicked ? "block" : "none",
            }}
          >
            <IconButton aria-label="close" onClick={onAddClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "50px",
            flexFlow: "row wrap",
          }}
        >
          {products.map((product) => (
            <Team
              name={product.name}
              region={product.region}
              format={product.format}
              teamCount={product.teamCount}
              map={product.map}
              entryCost={product.entryCost}
              prizePool={product.prizePool}
              id={product._id}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default TeamsPage;
