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
import { Modal, Alert } from "react-bootstrap";
import MessageEntryModal from "./MessageEntryModal";
import PlayerSearch from "../players/PlayerSearch";

export default (props) => {
  const { stanPlayer, setStanPlayer, trashtalkPlayer } = useContext(
    PlayerContext
  );
  const { messages, getMessages, addMessage } = useContext(MessageContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const { usersPlayers, updateUserPlayer, setMentionedCount } = useContext(
    UserPlayerContext
  );
  const { getUserById, currentUserId } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const playerRef = React.createRef();
  const URLref = React.createRef();
  const textRef = React.createRef();
  const activeUserId = parseInt(localStorage.getItem("whpf_user"));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alertText, setAlertText] = useState("NOICE");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const handleAlert = () => {
    setAlertType("success")
    setShowAlert(true);
  };

  // filtering and extracting things ya know
  const filteredCurrentUsersPlayers = currentUser.usersPlayers.filter(
    (up) => !up.mentioned
  );

  //not currently being used
  const mentionedUsersPlayers = currentUser.usersPlayers.filter(
    (up) => up.mentioned
  );

  const messageUrls = messages.map((m) => {
    return m.url;
  });

  // submit function
  const handleSubmitButtonPress = () => {
    const player =
      props.location === "modal" ? props.player : playerRef.current.value;
    const URL = URLref.current.value;
    const text = textRef.current.value;

    if (props.type === "stan" || props.type === "trash") {
      if (URL !== "" && player !== "0") {
        if (URL.includes(player.split(" ")[0].toLowerCase())) {
          if (!messageUrls.includes(URL)) {
            if (props.type === "stan") {
              const matchingStanPlayerObject = currentUsersPlayers.find(
                (PO) => {
                  return (
                    `${PO.player.firstName} ${PO.player.lastName}` === player
                  );
                }
              );

              const matchingStanUserPlayer = filteredCurrentUsersPlayers.find(
                (UP) => {
                  return matchingStanPlayerObject.player.id === UP.playerId;
                }
              );

              const updatedUPO = {
                id: matchingStanUserPlayer.id,
                userId: matchingStanUserPlayer.userId,
                playerId: matchingStanUserPlayer.playerId,
                mentioned: true,
              };
              updateUserPlayer(updatedUPO);

              const newStanMessage = {
                userId: currentUserId,
                messagetext: player,
                url: URL,
                timestamp: Date.now(),
                stan: true,
                trashtalk: false,
                chattext: text,
              };

              addMessage(newStanMessage);
              if (props.location !== "modal") {
                playerRef.current.value = "0";
              }
              URLref.current.value = "";
              textRef.current.value = "";
            }

            if (props.type === "trash") {
              const newTrashtalkMessage = {
                userId: currentUserId,
                messagetext: player,
                url: URL,
                timestamp: Date.now(),
                stan: false,
                trashtalk: true,
                chattext: text,
              };

              addMessage(newTrashtalkMessage);
              // playerRef.current.value = "0";
              URLref.current.value = "";
              textRef.current.value = "";
            }
          } else setAlertText("that's old news cap'n");
          setAlertType("warning");
          handleAlert();
        } else setAlertText("Where the PROOF??");
        setAlertType("warning");
        handleAlert();
      } else setAlertText("Better check that input");
      setAlertType("danger");
      handleAlert();
    } // end Stan/Trash as type alert("check that input yo") ; alert("that's old news cap'n") ; alert("Where the EVIDENCE???");
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

  if (props.type === "stan" && props.location !== "modal") {
    useEffect(() => {
      playerRef.current.value = stanPlayer;
    }, [stanPlayer]);
  }

  if (props.type === "trash" && props.location !== "modal") {
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

  //gonna try method 2 below
  // useEffect(() => {
  //   console.log(`UP collection changed, length of mentionedUPS is now ${mentionedUsersPlayers.length}`)
  //   getUserById(currentUserId)
  //     .then(setCurrentUser)
  //     .then(setMentionedCount(mentionedUsersPlayers.length));
  // }, [usersPlayers]);

  useEffect(() => {
    setMentionedCount(
      usersPlayers.filter((upo) => upo.userId === activeUserId && upo.mentioned)
        .length
    );
  }, [usersPlayers]);

  return (
    <>
      <Form>
        <Form.Group>
          {props.location === "modal" ? (
            <div className="modalPlayer">
              <span className="playerName">{props.player}</span>
              <PlayerSearch
                location="modal"
                playerDetails={{ playerName: props.player, type: props.type }}
                parent="messageEntry"
              />
            </div>
          ) : (
            playerInput
          )}
        </Form.Group>
        {props.location === "modal" && (
          <>
            <Form.Group>{url}</Form.Group>
            <Form.Group>{text}</Form.Group>
            <Form.Group>{submit}</Form.Group>
            {showAlert && (
              <Alert
                variant={
                  alertText === "that's old news cap'n" ||
                  alertText === "Better check that input"
                    ? "danger"
                    : "success"
                }
                onClose={() => {
                  setShowAlert(false);
                  setAlertText("NOICE")
                  setAlertType("success")
                }}
                dismissible
              >
                {alertText}
              </Alert>
            )}
          </>
        )}
      </Form>
    </>
  );
};
