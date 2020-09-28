import React, { useRef, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { PlayerSelect } from "../selectors/PlayerSelect";
import { MessageURLInput } from "./MessageURLInput";
import MessageEntryText from "./MessageEntryText";
import { MessageEntryButton } from "../buttons/MessageEntryButton";
import { Button } from "react-bootstrap";

export default (props) => {

  const playerRef = React.createRef()
  const URLref = React.createRef()

  const playerInput = <PlayerSelect type={props.type} ref={playerRef} />;
  const url = <MessageURLInput type={props.type} ref={URLref} />;
  const text = <MessageEntryText type={props.type} />;
  const submit = <MessageEntryButton type={props.type}/>;
  const title =
    props.type === "stan"
      ? "Stan by your Man"
      : props.type === "trash"
      ? "Talk that trash"
      : "Speak on it";

  return (
    <>
      <h2>{title}</h2>
      <Form>
        <Form.Group>{playerInput}</Form.Group>
        <Form.Group>{url}</Form.Group>
        <Form.Group>{text}</Form.Group>
        {submit}
        <Button onClick={(e) => {
          e.preventDefault()
          alert(URLref.current.value)
        }}>
          Testyman
        </Button>
      </Form>
    </>
  );
};
