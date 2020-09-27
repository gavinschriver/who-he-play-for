import React from "react";
import Form from "react-bootstrap/Form";
import PlayerSelect from "../selectors/PlayerSelect";

export default (props) => {
  const playerInput =
    props.type === "stan" ? (
      <PlayerSelect type="stan" />
    ) : props.type === "trash" ? (
      <PlayerSelect type="trash" />
    ) : (
      <div></div>
        );
  
  
  
  return (
    <Form>
      {playerInput}
    </Form>
  );
};
