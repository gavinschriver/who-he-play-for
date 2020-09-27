import React from "react";
import Form from "react-bootstrap/Form";
import PlayerSelect from "../selectors/PlayerSelect";

export default (props) => {
  const playerInput = <PlayerSelect type={props.type}/>
  

  return (
    <Form>
      {playerInput}
    </Form>
  );
};
