import React, { useRef, useEffect, useContext } from "react";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import validator from "validator";
import "../messages/messages.css";

export const TrashTalkEntryForm = () => {
  const { addMessage, messages } = useContext(MessageContext);
  const { usersPlayers, updateUserPlayer, setMentionedCount } = useContext(
    UserPlayerContext
  );
  const { playerObjArray, trashtalkPlayer } = useContext(PlayerContext);

  const messagetextRef = useRef("");
  const stanBarRef = useRef("");
  const urlRef = useRef("");

  const currentUser = parseInt(localStorage.getItem("whpf_user"));

  const handleTrashtalkButtonPress = () => {
    const trashtalkplayer = messagetextRef.current.value.split(' ')[0];
    const urlValue = urlRef.current.value;

    console.log(othersPlayersStrings, urlValue, trashtalkplayer.toLowerCase());
    if (
      validator.isURL(urlValue, { require_protocol: false }) &&
      urlValue.includes(trashtalkplayer.toLowerCase()) && urlValue.includes(`reddit`)
    ) {
      if (!allMatchingPlayersStrings.includes(trashtalkplayer)) {
        if (othersPlayersStrings.includes(trashtalkplayer)) {
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
        } else alert(`You tryin' to throw shade w/o backing it up?`);
      } else alert(`You trying to trash your own player? Rough look my dude`);
    } else alert("better check that input");
  };

  useEffect(() => {
    setMentionedCount(
      usersPlayers.filter((upo) => upo.userId === currentUser && upo.mentioned)
        .length
    );
  }, [usersPlayers]);

  //sets the value of the trash talk input bar in this component to the value of the TT player selected in message component
  useEffect(() => {
    messagetextRef.current.value = trashtalkPlayer;
  }, [trashtalkPlayer]);

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

  // this colleciton is CURRENT user's WHOLE lineup as FIRST names
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
  // All other user's lineups as UserPlayer objects
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
    return oPO.player.firstName;
  });

  return (
    <>
      <article className="messageEntry">
        <form className="messageEntry--form">
          <div className="messageEntry__trashtalk">
            <div className="messasgeEntry__trashtalk header">
              <h2>Talk that trash</h2>
              <div className="instructions">Choose a player to TRASH from another user's lineup</div>
            </div>

            <input
              type="text"
              name="messagetext"
              id="messagetext"
              placeholder="WHO YA GOT?"
              ref={messagetextRef}
              size="30"
              readOnly="true"
            />
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

            <div className="addMessageButton">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleTrashtalkButtonPress();
                }}
              >
                Fire away
              </button>
            </div>
          </div>
        </form>
      </article>
    </>
  );
};
