import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import MessageEntryForm from "./MessageEntryForm";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import "./messages.css";

export default (props) => {
  const { stanPlayer, trashtalkPlayer } = useContext(PlayerContext);
  const { mentionedCount } = useContext(UserPlayerContext);
  const player = props.type === "stan" ? stanPlayer : trashtalkPlayer;
  const title =
    props.type === "stan"
      ? "Stan By Your Man"
      : props.type === "trash"
      ? "Talk that trash"
      : "";

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [mentionedCount]);

  return (
    <>
      <div className="modalEntryContainer">
        <h2 className={`${props.type}-modal-header`}>{title}</h2>
        <Button onClick={handleShow}>{props.type.toUpperCase()}</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="messageEntryModal">
          <Modal.Header closeButton></Modal.Header>
          <MessageEntryForm
            location="modal"
            type={props.type}
            player={player}
          />
        </div>
      </Modal>
    </>
  );
};
