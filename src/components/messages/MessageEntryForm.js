import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { PlayerSelect } from "../selectors/PlayerSelect";
import { MessageURLInput } from "./MessageURLInput";
import { MessageEntryText } from "./MessageEntryText";
import { SubmitMessageButton } from "../buttons/SubmitMessageButton";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export default (props) => {
  const { stanPlayer, trashtalkPlayer } = useContext(PlayerContext);
  const { messages, getMessages, addMessage } = useContext(MessageContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers, updateUserPlayer, setMentionedCount } = useContext(UserPlayerContext)
  const { getUserById, currentUserId} = useContext(UserContext)
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const playerRef = React.createRef();
  const URLref = React.createRef();
  const textRef = React.createRef();

  const filteredCurrentUsersPlayers = currentUser.usersPlayers.filter(
    (up) => !up.mentioned
  );

  // submit function
  const handleSubmitButtonPress = () => {
    const player = playerRef.current.value;
    const URL = URLref.current.value;
    const text = textRef.current.value;

    console.log(filteredCurrentUsersPlayers)
  };


  // selections for rendering
  const playerInput = <PlayerSelect type={props.type} ref={playerRef} />;
  const url = <MessageURLInput type={props.type} ref={URLref} />;
  const text = <MessageEntryText type={props.type} ref={textRef} />;
  const submit = (
    <SubmitMessageButton action={handleSubmitButtonPress} type={props.type} />
  );
  const title =
    props.type === "stan"
      ? "Stan by your Man"
      : props.type === "trash"
      ? "Talk that trash"
      : "Speak on it";

  if (props.type === "stan") {
    useEffect(() => {
      console.log(stanPlayer);
      playerRef.current.value = stanPlayer;
    }, [stanPlayer]);
  }

  if (props.type === "trash") {
    useEffect(() => {
      console.log(trashtalkPlayer);
      playerRef.current.value = trashtalkPlayer;
    }, [trashtalkPlayer]);
  }

  useEffect(() => {
    getUserById(currentUserId).then(setCurrentUser).then(getPlayerData).then(getUsersPlayers).then(getMessages);
  }, [])

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
