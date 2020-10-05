import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import MessageEntryForm from "./MessageEntryForm";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export default (props) => {
  const { stanPlayer, trashtalkPlayer } = useContext(PlayerContext);
  const { mentionedCount } = useContext(UserPlayerContext);
  const player = props.type === "stan" ? stanPlayer : trashtalkPlayer;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [mentionedCount]);

  return (
    <>
      <Button onClick={handleShow}>{props.type}</Button>

      <Modal show={show} onHide={handleClose}>
        <MessageEntryForm location="modal" type={props.type} player={player} />
      </Modal>
    </>
  );
};
