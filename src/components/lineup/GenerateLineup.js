import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { Player } from "../players/Player";
import teamData from "../teams.json";

export const GenerateLineup = () => {
  const teams = teamData.teams;

  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const {
    usersPlayers,
    getUsersPlayers,
    addUserPlayer,
    removeUserPlayer,
  } = useContext(UserPlayerContext);

  const { mentionedCount } = useContext(UserPlayerContext);

  //set component state variables for 1) holding and setting userPlayer objects for current user; 2) state of lineup display div
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [generateButtonShowing, setGenerateButtonShowing] = useState(false);

  // making sure we only get players who match the conditions of being on an roster and having an image
  const filteredPlayers = playerObjArray.filter(
    (p) =>
      p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc
  );

  const filteredPlayerIds = filteredPlayers.map((p) => p.player.id);

  // posts 5 new userplayer objects
  const createUsersPlayers = () => {
    for (let i = 0; i < 5; i++) {
      const activeUserId = parseInt(localStorage.getItem("whpf_user"));
      const randomPlayerId =
        filteredPlayerIds[Math.floor(Math.random() * filteredPlayerIds.length)];

      const newUserPlayer = {
        userId: activeUserId,
        playerId: randomPlayerId,
      };
      addUserPlayer(newUserPlayer);
    }
  };

  const deleteUsersPlayers = () => {
    matchingUsersPlayers.forEach((mUPO) => {
      removeUserPlayer(mUPO.id);
    });
  };

  const handleGenerateLineup = () => {
    {
      deleteUsersPlayers();
      createUsersPlayers();
      setGenerateButtonShowing(false);
    }
  };

  useEffect(() => {
    getPlayerData().then(getUsersPlayers);
  }, []);

  useEffect(() => {
    const arrayOfMatchingUPOS = usersPlayers.filter((upo) => {
      return upo.userId === parseInt(localStorage.getItem("whpf_user"));
    });
    setMatchingUsersPlayers(arrayOfMatchingUPOS.reverse());
  }, [usersPlayers]);

  useEffect(() => {
    console.log(mentionedCount);
    if (mentionedCount === matchingUsersPlayers.length) {
      setGenerateButtonShowing(true);
    }
  }, [mentionedCount]);

  return (
    <>
      <div className="lineup__container">
        {(mentionedCount === 0 && !matchingUsersPlayers) ||
        mentionedCount === matchingUsersPlayers.length ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGenerateLineup();
            }}
          >
            Generate A Lineup
          </button>
        ) : (
          <div></div>
        )}

        {/* <button
          onClick={(e) => {
            e.preventDefault();
            deleteUsersPlayers();
          }}
        >
          Delete Lineup
        </button> */}

        <article className="lineup">
          <h2>Today's Lineup:</h2>
          {matchingUsersPlayers.map((mUPO) => {
            const matchingPlayerObj = filteredPlayers.find(
              (p) => p.player.id === mUPO.playerId
            );

            const matchingPlayerTeam = teams.find(t => {
              return t.abbreviation === matchingPlayerObj.player.currentTeam.abbreviation
            })

            return (
              <Player
                key={matchingPlayerObj.player.id}
                PO={matchingPlayerObj}
                TO={matchingPlayerTeam}
              />
            );
          })}
        </article>
      </div>
    </>
  );
};
