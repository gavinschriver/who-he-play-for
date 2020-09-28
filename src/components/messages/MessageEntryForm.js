import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { PlayerSelect } from "../selectors/PlayerSelect";
import { MessageURLInput } from "./MessageURLInput";
import { MessageEntryText } from "./MessageEntryText";
import { SubmitMessageButton } from "../buttons/SubmitMessageButton";
import { PlayerContext } from "../players/PlayerProvider";

export default (props) => {

  const {stanPlayer, trashtalkPlayer} = useContext(PlayerContext)
  const playerRef = React.createRef();
  const URLref = React.createRef();
  const textRef = React.createRef();

  const handleSubmitButtonPress = () => {
    const player = playerRef.current.value
    const URL = URLref.current.value
    const text = textRef.current.value
  };

  const playerInput = <PlayerSelect type={props.type} ref={playerRef} />;
  const url = <MessageURLInput type={props.type} ref={URLref} />;
  const text = <MessageEntryText type={props.type} ref={textRef} />;
  const submit =  <SubmitMessageButton action={handleSubmitButtonPress} type={props.type} />
  const title =
    props.type === "stan"
      ? "Stan by your Man"
      : props.type === "trash"
      ? "Talk that trash"
        : "Speak on it";

  if (props.type === "stan") {
    useEffect(() => {
      console.log(stanPlayer)
      playerRef.current.value = stanPlayer
    }, [stanPlayer])
  }

  if (props.type === "trash") {
    useEffect(() => {
      console.log(trashtalkPlayer)
      playerRef.current.value = "poopy?"
    }, [trashtalkPlayer])
  }

  return (
    <>
      <h2>{title}</h2>
      <Form>
        <Form.Group>{playerInput}</Form.Group>
        <Form.Group>{url}</Form.Group>
        <Form.Group>{text}</Form.Group>
        <Form.Group>{submit}</Form.Group>
      </Form>
    </>
  );
};
