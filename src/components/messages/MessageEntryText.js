import React, { useRef } from "react";
import FormControl from "react-bootstrap/FormControl";

export default (props) => {
  const chatRef = useRef("");
  const instructions =
    props.type === "stan" ? (
      <h4>Quick hits</h4>
    ) : props.type === "trash" ? (
      <h4>Garbage time</h4>
    ) : (
      ""
    );
  return (
    <>
      {instructions}
      <FormControl
        as="textarea"
        type="textarea"
        name="chat"
        placeholder="Care to add #anythingelse?"
        size="30"
        className="chattext form--control"
        ref={chatRef}
      />
    </>
  );
};
