import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "./MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import "./messages.css";

export const MessageEntryForm = () => {
  const { addMessage } = useContext(MessageContext);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray } = useContext(PlayerContext);

  const messagetextRef = useRef("");
  const urlRef = useRef("");

  const handleSubmitButtonEvent = () => {
    if (matchingPlayersStrings.includes(messagetextRef.current.value)) {
      const newMessage = {
        userId: parseInt(localStorage.getItem("whpf_user")),
        messagetext: messagetextRef.current.value,
        url: urlRef.current.value,
        timestamp: Date.now(),
      };
      addMessage(newMessage);
    } else alert('no go bro')
  };

  const matchingUsersPlayers = usersPlayers.filter((upo) => {
    return (upo.userId === parseInt(localStorage.getItem("whpf_user"))) && !upo.mentioned;
  });

  const matchingPlayersObjects = matchingUsersPlayers.map((mUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === mUPO.playerId;
    });
  });

  const matchingPlayersStrings = matchingPlayersObjects.map((mPO) => {
    return mPO.player.firstName;
  });

  useEffect(() => {
    console.log(matchingPlayersStrings);
  }, [matchingPlayersStrings]);

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
            required
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
