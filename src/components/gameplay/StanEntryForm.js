import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import validator from "validator";
import "../messages/messages.css";

export const StanEntryForm = () => {
  const { addMessage, messages, getMessages } = useContext(MessageContext);
  const {
    usersPlayers,
    getUsersPlayers,
    updateUserPlayer,
    setMentionedCount,
  } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);

  const stanBarRef = useRef("");
  const urlRef = useRef("");
  let stanPlayerFirstAndLastName = "";

  const currentUser = parseInt(localStorage.getItem("whpf_user"));

  const handleStanButtonPress = () => {
    const urlValue = urlRef.current.value;
    const stanBarPlayer = stanBarRef.current.value;
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
          };
          addMessage(newMessage);

          alert(validator.isURL(urlValue));
        } else if (allMatchingPlayersStrings.includes(stanBarPlayer)) {
          alert(`Woah slow down stanimal, you already repped this player`);
        }
      } else alert(`someone already cited that proof`);
    } else alert(`better check that input stanley`);
  };

  //init hook
  useEffect(() => {
    getPlayerData().then(getUsersPlayers).then(getMessages);
  }, []);

  useEffect(() => {
    setMentionedCount(
      usersPlayers.filter((upo) => upo.userId === currentUser && upo.mentioned)
        .length
    );
  }, [usersPlayers]);

  // array of all URL values of all messages for duplicate check
  const messageUrls = messages.map((m) => {
    return m.url;
  });

  // this colleciton is current user's WHOLE lineup as UPOs
  const allMatchingUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === currentUser;
  });

  // this collection is current user's WHOLE linup as player objects
  const allMatchingPlayersObjects =
    allMatchingUsersPlayers.map((fUPO) => {
      return playerObjArray.find((p) => {
        return p.player.id === fUPO.playerId;
      });
    }) || {};

  // this colleciton is current user's WHOLE lineup as FIRST names
  const allMatchingPlayersStrings = allMatchingPlayersObjects.map((mPO) => {
    return mPO.player.firstName;
  });

  //FILTERED BASED ON BEING MENTIONED....
  // this colleciton is ONLY UPOS for the current user that HAVE NOT been marked as mentioned
  const filteredUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === currentUser && !upo.mentioned;
  });

  //Player Objects that correspond to the above
  const filteredPlayersObjects = filteredUsersPlayers.map((fUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === fUPO.playerId;
    });
  });

  const filteredPlayersIDs = filteredUsersPlayers.map((fUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === fUPO.playerId;
    });
  });

  //Strings of the Player first names for the above (aka only player first names in the user's lineup they haven't mentioned yet)
  const filteredPlayersStrings = filteredPlayersObjects.map((fPO) => {
    return fPO.player.firstName;
  });

  // FOR OTHER USERS PLAYER LINEUPS
  const othersUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId != currentUser;
  });

  const othersPlayersObjs = othersUsersPlayers.map((oUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === oUPO.playerId;
    });
  });

  const othersPlayersStrings = othersPlayersObjs.map((oPO) => {
    return oPO.player.firstName;
  });

  return (
    <>
      <article className="messageEntry">
        <form className="messageEntry--form">
          <div className="messageEntry__stan">
            <div className="messasgeEntry__stand header">
              <h2>Stan by your man</h2>
              <div className="instructions">
                Choose a player from your starting 5 to stan
              </div>
            </div>

            <select ref={stanBarRef}>
              {filteredPlayersObjects.map((fpo) => {
                return (
                  <option value={fpo.player.firstName}>
                    {fpo.player.firstName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="messageEntry__URL">
            <h2>But you'd better back it up</h2>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="Enter #relevancontent"
              pattern="https://.*"
              size="30"
              ref={urlRef}
            />

            <button
              className="addMessageButton"
              onClick={(e) => {
                e.preventDefault();
                handleStanButtonPress();
              }}
            >
              Fire away
            </button>
          </div>
        </form>
      </article>
    </>
  );
};
