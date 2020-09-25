import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { PlayerContext } from "../players/PlayerProvider";

export const PlayerSelectButton = (props) => {
  const { setStanPlayer, setTrashtalkPlayer } = useContext(PlayerContext);

  const typeClass =
    props.type === "stan"
      ? "stan--button"
      : props.type === "trash"
      ? "trash--button"
      : "";

  const locationClass = `${props.location}--button`;

  const buttonText =
      props.type === "stan" ? "STAN" : props.type === "trash" ? "TRASH" : "";
    

    const clickFunction = ((e) => {
        e.preventDefault();
        props.type === "stan" ? setStanPlayer(props.player) : setTrashtalkPlayer(props.player)
        window.location.href = "#gamecontainer"
    })

  return (
    <Button className={`${typeClass} ${locationClass}`} onClick={clickFunction}>
      {buttonText}
    </Button>
  );
};
