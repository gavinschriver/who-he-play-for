import React, {useContext} from "react";
import Button from "react-bootstrap/Button";
import { MessageContext } from "../messages/MessageProvider";

export const DeleteMessageButton = (props) => {
  const { removeMessage } = useContext(MessageContext);
  const locationClass = `${props.location}--button`;

  const handleDeleteButtonClick = () => {
    removeMessage(props.id);
  };

  return (
    <Button
      className={`delete--button ${locationClass}--delete--button`}
      onClick={(e) => {
        e.preventDefault();
        handleDeleteButtonClick();
      }}
    >
      #regret
    </Button>
  );
};
