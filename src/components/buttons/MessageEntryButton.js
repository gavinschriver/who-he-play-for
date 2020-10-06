import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { PlayerContext } from "../players/PlayerProvider";

export const MessageEntryButton = (props) => {
  const { stanPlayer, trashtalkPlayer } = useContext(PlayerContext);
  const playerExists =
    props.type === "stan"
      ? stanPlayer
      : props.type === "trash"
      ? trashtalkPlayer
      : "";
  const type = props.type;
  const typeText = props.type === "stan" ? "BANG!" : "Shots Fired";

  const handleSubmitMessageClick = props.action;

  return (
    <Button
      onClick={(e) => {
          e.preventDefault();
          handleSubmitMessageClick();
      }}
    >
      {typeText}
    </Button>
  );
};
