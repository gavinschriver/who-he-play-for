import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import PlayerSelect from "../selectors/PlayerSelect";
import MessageURLInput from "./MessageURLInput";
import MessageEntryText from "./MessageEntryText";
import { propTypes } from "react-bootstrap/esm/Image";

export default (props) => {
  const playerInput = <PlayerSelect type={props.type} />;
  const url = <MessageURLInput type={props.type} />;
  const text = <MessageEntryText type={props.type} />;
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
      </Form>
    </>
  );
};
