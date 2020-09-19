import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "./MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import validator from "validator";
import "./messages.css";

export const MessageEntryForm = () => {
  const { addMessage, messages } = useContext(MessageContext);
  const { usersPlayers, updateUserPlayer, setMentionedCount } = useContext(
    UserPlayerContext
  );
  const { playerObjArray, setOtherUsersPlayers } = useContext(PlayerContext);

  const messagetextRef = useRef("");
  const stanBarRef = useRef("");
  const urlRef = useRef("");

  const handleStanButtonPress = () => {
    const stanplayer = messagetextRef.current.value;
    const urlValue = urlRef.current.value;
    const stanBarPlayer = stanBarRef.current.value;
    alert(stanBarPlayer);
    if (validator.isURL(urlValue)) {
      if (!messageUrls.includes(urlValue)) {
        if (filteredPlayersStrings.includes(stanBarPlayer)) {
          const matchingPO = filteredPlayersObjects.find((mPO) => {
            return mPO.player.firstName === stanBarPlayer;
          });

          console.log(matchingPO);

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
            userId: parseInt(localStorage.getItem("whpf_user")),
            messagetext: stanBarPlayer,
            url: urlRef.current.value,
            timestamp: Date.now(),
            stan: true,
          };
          addMessage(newMessage);
        } else if (allMatchingPlayersStrings.includes(stanplayer)) {
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
          userId: parseInt(localStorage.getItem("whpf_user")),
          messagetext: messagetextRef.current.value,
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
      usersPlayers.filter(
        (upo) =>
          upo.userId === parseInt(localStorage.getItem("whpf_user")) &&
          upo.mentioned
      ).length
    );
  }, [usersPlayers]);

  // array of all URL values of all messages
  const messageUrls = messages.map((m) => {
    return m.url;
  });

  // this colleciton is current user's WHOLE lineup as UPOs
  const allMatchingUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === parseInt(localStorage.getItem("whpf_user"));
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
    return (
      upo.userId === parseInt(localStorage.getItem("whpf_user")) &&
      !upo.mentioned
    );
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
    return upo.userId != parseInt(localStorage.getItem("whpf_user"));
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
    <section className="messageEntryForm">
      <form>
        <fieldset>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleStanButtonPress();
            }}
          >
            Stan by your man
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleTrashtalkButtonPress();
            }}
          >
            Talk that trash
          </button>
          <input
            type="text"
            name="messagetext"
            id="messagetext"
            placeholder="Who ya got? (Player first name)"
            ref={messagetextRef}
          />
        </fieldset>
        <div className="stanInputContainer">
          <select ref={stanBarRef}>
            {filteredPlayersObjects.map((fpo) => {
              return (
                <option value={fpo.player.firstName}>
                  {fpo.player.firstName}
                </option>
              );
            })}
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleStanButtonPress();
            }}
          >
            Can't stan the heat
          </button>
      
        </div>
        <div className="urlInputContainer">
          <input
            type="url"
            name="url"
            id="url"
            placeholder="better back it up"
            pattern="https://.*"
            size="30"
            ref={urlRef}
          ></input>
        </div>
      </form>
    </section>
  );
};
