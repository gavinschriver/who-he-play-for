import React, { useState } from "react";
import Stats from "../highlights/Stats";
import { Button, Modal } from "react-bootstrap";

export default (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const playerId = props.id;

  return (
    <>
      <Button onClick={handleShow}>Hit me</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Stats id={playerId} />
        </Modal.Body>
      </Modal>
    </>
  );
};
