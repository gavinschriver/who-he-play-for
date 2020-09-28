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
  const {
    updateUserPlayer,
    setMentionedCount,
  } = useContext(UserPlayerContext);
  const { getUserById, currentUserId } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const playerRef = React.createRef();
  const URLref = React.createRef();
  const textRef = React.createRef();

  // filtering and extracting things ya know
  const filteredCurrentUsersPlayers = currentUser.usersPlayers.filter(
    (up) => !up.mentioned
  );

  const messageUrls = messages.map((m) => {
    return m.url;
  });

  // submit function
  const handleSubmitButtonPress = () => {
    const player = playerRef.current.value;
    const URL = URLref.current.value;
    const text = textRef.current.value;

    if (props.type === "stan" || props.type === "trash") {
      if (URL !== "" && player !== "") {
        if (!messageUrls.includes(URL)) {
          if (props.type === "stan") {
            console.log("issastan")
          }

          if (props.type === "trash") {
            console.log("issatraashhh")
          }
        } else alert("that's old news cap'n")
      } else alert("check that input yo")
      

    } // end Stan/Trash as type 

    

  };

  // const matchingStanPlayerObject = currentUsersPlayers.find(PO => {
  //   return `${PO.player.firstName} ${PO.player.lastName}` === player
  // })

  // const matchingStanUserPlayer = filteredCurrentUsersPlayers.find(UP => {
  //   return matchingStanPlayerObject.player.id === UP.playerId
  // })

  // const updatedUPO = {}

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
      playerRef.current.value = stanPlayer;
    }, [stanPlayer]);
  }

  if (props.type === "trash") {
    useEffect(() => {
      playerRef.current.value = trashtalkPlayer;
    }, [trashtalkPlayer]);
  }

  useEffect(() => {
    const matchingPlayers =
      filteredCurrentUsersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setCurrentUsersPlayers(matchingPlayers);
  }, [playerObjArray]);

  useEffect(() => {
    getUserById(currentUserId)
      .then(setCurrentUser)
      .then(getPlayerData)
      .then(getMessages);
  }, []);

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
