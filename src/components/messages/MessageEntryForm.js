import React from "react";
import Form from "react-bootstrap/Form";
import PlayerSelect from "../selectors/PlayerSelect";

export default (props) => {
  const playerInput =
    props.type === "stan" ? (
      <Form.Control as="select">
        <optio>CHOOSEY PICKY</optio>
      </Form.Control>
    ) : props.type === "trash" ? (
      <Form.Control type="text"></Form.Control>
    ) : (
      <div></div>
        );
  
  
  
  return (
    <Form>
      <Form.Group>
        {/* choose player control/labels here */}
        {playerInput}
      </Form.Group>
      <PlayerSelect type="stan" />
    </Form>
  );
};
