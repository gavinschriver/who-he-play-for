import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import validator from "validator";
import "../messages/messages.css";

export const StanEntryForm = () => {
  const { addMessage, messages } = useContext(MessageContext);
  const { usersPlayers, updateUserPlayer, setMentionedCount } = useContext(
    UserPlayerContext
  );
  const { playerObjArray } = useContext(PlayerContext);

  const messagetextRef = useRef("");
  const stanBarRef = useRef("");
  const urlRef = useRef("");

  const currentUser = parseInt(localStorage.getItem("whpf_user"));

  const handleStanButtonPress = () => {
    const urlValue = urlRef.current.value;
    const stanBarPlayer = stanBarRef.current.value;
    if (validator.isURL(urlValue)) {
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
        } else if (allMatchingPlayersStrings.includes(stanBarPlayer)) {
          alert(`Woah slow down stanimal, you already repped this player`);
        }
      } else alert(`someone already cited that proof`);
    } else alert(`better check that input stanley`);
  };

  const handleTrashtalkButtonPress = () => {
    const trashtalkplayer = messagetextRef.current.value;
    const urlValue = urlRef.current.value;

    if (othersPlayersStrings.includes(trashtalkplayer) && urlValue !== "") {
      if (!messageUrls.includes(urlValue)) {
        const newMessage = {
          userId: currentUser,
          messagetext: trashtalkplayer,
          url: urlRef.current.value,
          timestamp: Date.now(),
          trashtalk: true,
        };
        addMessage(newMessage);
      } else alert(`someone already cited that proof`);
    } else alert(`better check that input stanley`);
  };

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
  const allMatchingPlayersObjects = allMatchingUsersPlayers.map((fUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === fUPO.playerId;
    });
  });

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

  //Strings of the Player first names for the above (aka only player first names in the user's lineup they haven't mentioned yet)
  const filteredPlayersStrings = filteredPlayersObjects.map((mPO) => {
    return mPO.player.firstName;
  });

  // FOR OTHER PLAYERS LINEUPS
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
      <section className="messageEntry">
        <form className="messageEntry--form">
          <article className="messageEntry--choiceContainer">
            <div className="messageEntry__stan">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleStanButtonPress();
                }}
              >
                Stan by your man
              </button>
              
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
              <h2>But you'd</h2>
              <input
                type="url"
                name="url"
                id="url"
                placeholder="better back it up"
                pattern="https://.*"
                size="30"
                ref={urlRef}
              />
            </div>
          </article>
        </form>
      </section>
    </>
  );
};
