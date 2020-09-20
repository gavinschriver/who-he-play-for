import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { Player } from "../players/Player";
import teamData from "../teams.json";
import "./Lineup.css"

export const GenerateLineup = () => {
  //for looking up info about teams from NBA reference
  const teams = teamData.teams;

  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const {
    usersPlayers,
    getUsersPlayers,
    addUserPlayer,
    removeUserPlayer,
  } = useContext(UserPlayerContext);


  // Binds to the app-state variableset in UsersPlayers provider 
  //to track how many userPlayers have been stan'd by being marked as mentioned
  const { mentionedCount } = useContext(UserPlayerContext);

  //set component state variables for 1) holding and setting userPlayer objects for current user; 2) state of lineup display div
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [generateButtonShowing, setGenerateButtonShowing] = useState(false);

  // making sure we only get players who match the conditions of being on an roster and having an image
  const filteredPlayers = playerObjArray.filter(
    (p) =>
      p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc && p.player.currentTeam
  );

  //Ids only of player objects who match the criteria set above
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

  // Invoke a delete function for each UPO in the component-state collection "matchingUsersPlayers"
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


  // initializer call to bring in player data and usersPlayers
  useEffect(() => {
    getPlayerData().then(getUsersPlayers);
  }, []);

  // listens for a change to usersPlayers API collection and resets component-level collection of only those matching the current user's id 
  useEffect(() => {
    const arrayOfMatchingUPOS = usersPlayers.filter((upo) => {
      return upo.userId === parseInt(localStorage.getItem("whpf_user"));
    });
    setMatchingUsersPlayers(arrayOfMatchingUPOS);
  }, [usersPlayers]);

//dont think this does anything really
  useEffect(() => {
    console.log(mentionedCount);
    if (mentionedCount === matchingUsersPlayers.length) {
      setGenerateButtonShowing(true);
    }
  }, [mentionedCount]);

  return (
    <>
      <article className="lineup__container">
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

        <section className="lineup">
          <h2>Your Starting 5:</h2>
          {matchingUsersPlayers.map((mUPO) => {
            const matchingPlayerObj = filteredPlayers.find(
              (p) => p.player.id === mUPO.playerId
            );

            const matchingPlayerTeam = teams.find(t => {
              return t.abbreviation === matchingPlayerObj.player.currentTeam.abbreviation
            }) || {}

            return (
              <Player
                key={matchingPlayerObj.player.id}
                PO={matchingPlayerObj}
                TO={matchingPlayerTeam}
              />
            );
          })}
        </section>
      </article>
    </>
  );
};
