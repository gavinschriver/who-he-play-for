import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import MessageEntryForm from "./MessageEntryForm";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import "./messages.css";
import { GiBasketballBasket } from "react-icons/gi/";
import {FaRegTrashAlt} from "react-icons/fa/"

export default (props) => {
  const { stanPlayer, trashtalkPlayer } = useContext(PlayerContext);
  const { mentionedCount } = useContext(UserPlayerContext);
  const player =
    props.location === "lineup" || props.location === "playercard"
      ? props.player
      : props.type === "stan"
      ? stanPlayer
      : trashtalkPlayer;
  const title =
    props.type === "stan"
      ? "Stan By Your Man"
      : props.type === "trash"
      ? "Talk that trash"
      : "";

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const icon = props.type === "stan" ? <GiBasketballBasket /> : props.type === "trash" ? <FaRegTrashAlt /> : ""

  useEffect(() => {
    handleClose();
  }, [mentionedCount]);



  return (
    <>
      <div className="modalEntryContainer">
        {props.location !== "lineup" && props.location !== "playercard" && props.location !== "gameplay" && (
          <h2 className={`${props.type}-modal-header`}>{title}</h2>
        )}
        <Button onClick={handleShow}>{props.type.toUpperCase()}{' '}{icon}</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="messageEntryModal">
          <h2 className="messageEntryModal_header"><Modal.Header closeButton>{title}</Modal.Header></h2> 
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
