import React from "react";
import { Button } from "react-bootstrap";

export const SubmitMessageButton = (props) => {
  const text =
    props.type === "stan"
      ? "BANG"
      : props.type === "trash"
      ? "Shots fired"
      : "Speak on it son";

  return <Button onClick={props.action}>{text}</Button>;
};
