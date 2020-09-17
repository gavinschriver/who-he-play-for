import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "./MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import "./messages.css";

export const MessageEntryForm = () => {
  const { addMessage } = useContext(MessageContext);
  const { usersPlayers, updateUserPlayer, setMentionedCount } = useContext(
    UserPlayerContext
  );
  const { playerObjArray } = useContext(PlayerContext);

  const messagetextRef = useRef("");
  const urlRef = useRef("");

  const handleSubmitButtonEvent = () => {
    //does the value of the input for the player's name match a string in the current users collection of player strings?
    if (matchingPlayersStrings.includes(messagetextRef.current.value)) {
      const matchingPO = matchingPlayersObjects.find((mPO) => {
        return mPO.player.firstName === messagetextRef.current.value;
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
        userId: parseInt(localStorage.getItem("whpf_user")),
        messagetext: messagetextRef.current.value,
        url: urlRef.current.value,
        timestamp: Date.now(),
        stan: true
      };
      addMessage(newMessage);
      // if not, does the value of the input for the player's name match a string in the collection of strings of other user's players?
    } else {
      if (othersPlayersStrings.includes(messagetextRef.current.value)) {
        const newMessage = {
          userId: parseInt(localStorage.getItem("whpf_user")),
          messagetext: messagetextRef.current.value,
          url: urlRef.current.value,
          timestamp: Date.now(),
        };
        addMessage(newMessage);
      } else
      alert("no go bro");
    }
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

  const filteredUsersPlayers = usersPlayers.filter((upo) => {
    return (
      upo.userId === parseInt(localStorage.getItem("whpf_user")) &&
      !upo.mentioned
    );
  });

  const matchingPlayersObjects = filteredUsersPlayers.map((fUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === fUPO.playerId;
    });
  });

  const matchingPlayersStrings = matchingPlayersObjects.map((mPO) => {
    return mPO.player.firstName;
  });

  // for other player's lineups...
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
          <input
            type="text"
            name="messagetext"
            id="messagetext"
            placeholder="TALK THAT TRASH"
            ref={messagetextRef}
            required
          />
          <input
            type="url"
            name="url"
            id="url"
            placeholder="better back it up"
            pattern="https://.*"
            size="30"
            require
            ref={urlRef}
          ></input>
        </fieldset>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmitButtonEvent();
          }}
        >
          STAN
        </button>
      </form>
    </section>
  );
};
