import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import validator from "validator";
import Form from "react-bootstrap/Form";
import "../messages/messages.css";

export const StanEntryForm = () => {
  const { addMessage, messages, getMessages } = useContext(MessageContext);
  const {
    usersPlayers,
    getUsersPlayers,
    updateUserPlayer,
    setMentionedCount,
  } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData, stanPlayer } = useContext(
    PlayerContext
  );

  // references for input
  const stanBarRef = useRef("");
  const urlRef = useRef("");
  const chatRef = useRef("");
  const currentUser = parseInt(localStorage.getItem("whpf_user"));
  let stanPlayerFirstAndLastName = "";

  // stan button pressed
  const handleStanButtonPress = () => {
    const urlValue = urlRef.current.value.toLowerCase();
    const stanBarPlayer = stanBarRef.current.value;
    const chatValue = chatRef.current.value;

    // code to reattach a player's first name to their last name for search validaiton cause im an idiot
    const stanBarPlayerObject = filteredPlayersObjects.find((fPO) => {
      return fPO.player.firstName === stanBarPlayer;
    });
    const stanBarPlayerLastName = stanBarPlayerObject.player.lastName;
    stanPlayerFirstAndLastName = `${stanBarPlayer} ${stanBarPlayerLastName}`;

    if (
      validator.isURL(urlValue) &&
      urlValue.includes(stanBarPlayer.toLowerCase())
    ) {
      if (!messageUrls.includes(urlValue)) {
        if (filteredPlayersStrings.includes(stanBarPlayer)) {
          const matchingPO = filteredPlayersObjects.find((mPO) => {
            return mPO.player.firstName === stanBarPlayer;
          });

          const matchingUPO = filteredUsersPlayers.find((uPO) => {
            return uPO.playerId === matchingPO.player.id;
          });

          const updatedUPO = {
            id: matchingUPO.id,
            userId: matchingUPO.userId,
            playerId: matchingUPO.playerId,
            mentioned: true,
          };

          updateUserPlayer(updatedUPO);

          const newMessage = {
            userId: currentUser,
            messagetext: stanBarPlayer,
            url: urlRef.current.value,
            timestamp: Date.now(),
            stan: true,
            trashtalk: false,
            chattext: chatValue,
          };
          addMessage(newMessage);

          // alert(validator.isURL(urlValue));
        } else if (allMatchingPlayersStrings.includes(stanBarPlayer)) {
          alert(`Woah slow down stanimal, you already repped this player`);
        }
      } else alert(`someone already cited that proof`);
    } else alert(`better check that input stanley`);
  };

  // array of all URL values of all messages for duplicate check
  const messageUrls = messages.map((m) => {
    return m.url;
  });

  // find current user's lineup
  const allMatchingUsersPlayers =
    usersPlayers.filter((upo) => {
      return upo.userId === currentUser;
    }) || {};

  const allMatchingPlayersObjects =
    allMatchingUsersPlayers.map((fUPO) => {
      return playerObjArray.find((p) => {
        return p.player.id === fUPO.playerId;
      });
    }) || {};

  const allMatchingPlayersStrings = allMatchingPlayersObjects.map((mPO) => {
    return mPO.player.firstName;
  });

  // find players in lineup that have not been mentioned; if the player in the bar equals one of these, a submission will pass that test
  const filteredUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === currentUser && !upo.mentioned;
  });

  const filteredPlayersObjects = filteredUsersPlayers.map((fUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === fUPO.playerId;
    });
  });

  const filteredPlayersStrings = filteredPlayersObjects.map((fPO) => {
    return fPO.player.firstName;
  });

  // Init Hook
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
    stanBarRef.current.value = stanPlayer;
  }, [stanPlayer]);

  return (
    <>
      <article className="messageEntry messageEntry--stan">
        <Form className="messageEntry--form">
          <div className="messageEntry__stan">
            <Form.Group className="stanSelect formgroup stan--formgroup">
              <h2 className="messasgeEntry__stan header messageEntry--header">
                Stan by your man
              </h2>
              <h4 className="instructions stan--instructions">
                Choose a player from your starting 5 to stan
              </h4>
              <Form.Control as="select" ref={stanBarRef}>
                <option value="empty" defaultValue="">
                  Choose a player
                </option>
                {filteredPlayersObjects.map((fpo) => {
                  return (
                    <option value={fpo.player.firstName}>
                      {fpo.player.firstName} {fpo.player.lastName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <h4 className="instructions stan--instructions">
                Put some SAUCE on it
              </h4>
              <Form.Control
                className="stan__content entryForm--url--control form--control"
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
              <Form.Control as="textarea"
                type="textarea"
                name="chat"
                placeholder="Care to add anything else?"
                size="30"
                className="chattext form--control"
                ref={chatRef}
              />
            </Form.Group>

            <button
              className="messageEntry__stan button addMessage--button"
              onClick={(e) => {
                e.preventDefault();
                if (stanBarRef.current.value !== "empty") {
                  handleStanButtonPress();
                }
              }}
            >
              Fire away
            </button>
          </div>
        </Form>
      </article>
    </>
  );
};
