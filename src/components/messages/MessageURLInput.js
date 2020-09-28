import React, { forwardRef } from "react";
import { FormControl } from "react-bootstrap";

export const MessageURLInput = forwardRef((props, ref) => {
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
        ref={ref}
      />
    </>
  );
});
