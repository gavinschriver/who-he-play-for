import React from "react";
import Form from "react-bootstrap/Form";
import PlayerSelect from "../selectors/PlayerSelect";

export default (props) => {
  const playerInput =
    props.type === "stan" ? (
      <Form.Control as="select">
        <option>CHOOSEY PICKY</option>
      </Form.Control>
    ) : props.type === "trash" ? (
      <Form.Control type="text"></Form.Control>
    ) : (
      <div></div>
        );
  
  
  
  return (
    <Form>
      <PlayerSelect type="stan" />
    </Form>
  );
};
