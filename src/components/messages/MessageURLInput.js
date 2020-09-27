import React, { useRef } from "react";
import { FormControl } from "react-bootstrap";

export default (props) => {
  const urlRef = useRef("");
  const heading =
    props.type === "stan" ? (
      <h4>Put some SAUCE on it</h4>
    ) : props.type === "trash" ? (
      <h4>Better back it up</h4>
    ) : (
      ""
    );

  return (
    <>
      {heading}
      <FormControl
        type="text"
        name="url"
        id="url"
        placeholder="URL must contain player's name"
        ref={urlRef}
      />
    </>
  );
};
