import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import validator from "validator";
import "../messages/messages.css";
import { Form } from "react-bootstrap";

export const TrashTalkEntryForm = () => {
  const { addMessage, getMessages, messages } = useContext(MessageContext);
  const { usersPlayers, getUsersPlayers, setMentionedCount } = useContext(
    UserPlayerContext
  );
  const { getPlayerData, playerObjArray, trashtalkPlayer } = useContext(
    PlayerContext
  );

  //component-state variables
  const messagetextRef = useRef("");
  const urlRef = useRef("");
  const chatRef = useRef("");
  const currentUser = parseInt(localStorage.getItem("whpf_user"));

  // trash talk button press
  const handleTrashtalkButtonPress = () => {
    const trashtalkplayer = messagetextRef.current.value.split(" ")[0];
    const urlValue = urlRef.current.value.toLowerCase();
    const chatValue = chatRef.current.value;

    if (
      validator.isURL(urlValue) &&
      urlValue.includes(trashtalkplayer.toLowerCase())
    ) {
      if (!allMatchingPlayersStrings.includes(trashtalkplayer)) {
        if (othersPlayersStrings.includes(trashtalkplayer.toLowerCase())) {
          if (!messageUrls.includes(urlValue)) {
            const newMessage = {
              userId: currentUser,
              messagetext: trashtalkplayer,
              url: urlRef.current.value,
              timestamp: Date.now(),
              trashtalk: true,
              stan: false,
              chattext: chatValue,
            };
            addMessage(newMessage);
          } else alert(`that's old news captain`);
        } else alert(`Sorry, who you tryin' to trash exactly?`);
      } else alert(`You trying to trash your own player? Rough look my dude`);
    } else alert("better check that input");
  };

  // array of all URL values of all messages for duplicate check
  const messageUrls = messages.map((m) => {
    return m.url;
  });

  // find current user's lineup
  const allMatchingUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === currentUser;
  });

  const allMatchingPlayersObjects = allMatchingUsersPlayers.map((fUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === fUPO.playerId;
    });
  });

  const allMatchingPlayersStrings = allMatchingPlayersObjects.map((mPO) => {
    return mPO.player.firstName;
  });

  // find all players on other user's lineups
  const othersUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId != currentUser;
  });

  //
  const othersPlayersObjs = othersUsersPlayers.map((oUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === oUPO.playerId;
    });
  });

  const othersPlayersStrings = othersPlayersObjs.map((oPO) => {
    return oPO.player.firstName.toLowerCase();
  });

  // effects
  useEffect(() => {
    getPlayerData().then(getUsersPlayers).then(getMessages);
  }, []);

  useEffect(() => {
    setMentionedCount(
      usersPlayers.filter((upo) => upo.userId === currentUser && upo.mentioned)
        .length
    );
  }, [usersPlayers]);

  useEffect(() => {
    messagetextRef.current.value = trashtalkPlayer;
  }, [trashtalkPlayer]);

  return (
    <>
      <article className="messageEntry messageEntry--trashtalk">
        <Form className="messageEntry--form">
          <div className="messageEntry__trashtalk">
            <Form.Group className="trashSelect formgroup trash--formgroup">
              <h2 className="messasgeEntry__trashtalk header messageEntry--header">
                Talk that trash
              </h2>
              <h4 className="instructions trashtalk--instructions">
                Choose a player to TRASH from another user's lineup
              </h4>

              <Form.Control
                type="text"
                name="messagetext"
                id="messagetext"
                placeholder="WHO YA GOT?"
                ref={messagetextRef}
                size="30"
              />
            </Form.Group>

            <Form.Group className="trashContent formgroup trash--formgroup">
              <h4 className="instructions trashtalk--instructions">
                But you'd better back it up
              </h4>
              <Form.Control
                className="trashtalk__content entryForm--url--control form--control"
                type="url"
                name="url"
                id="url"
                placeholder="URL must contain reference to player"
                pattern="https://.*"
                size="30"
                ref={urlRef}
              />
            </Form.Group>

            <Form.Group>
            <h4 className="instructions trashtalk--instructions">
                Garbage time
              </h4>
              <Form.Control as="textarea"
                type="textarea"
                name="chat"
                placeholder="Care to add #anythingelse?"
                size="30"
                className="chattext form--control"
                ref={chatRef}
              />
            </Form.Group>

            <button
              className="messageEntry__trash button addMessage--button"
              onClick={(e) => {
                e.preventDefault();
                handleTrashtalkButtonPress();
              }}
            >
              Shots fired
            </button>
          </div>
        </Form>
      </article>
    </>
  );
};
