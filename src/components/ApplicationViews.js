import React from "react";
import { GenerateLineup } from "./lineup/GenerateLineup";
import { PlayerProvider } from "./players/PlayerProvider";
import { UserPlayerProvider } from "./usersPlayers/UsersPlayersProvider"
 
export const ApplicationViews = (props) => {
  return (
    <>
      <div>HEY. WHO HE PLAY FOR?</div>
      <PlayerProvider>
        <UserPlayerProvider>
          <GenerateLineup />
        </UserPlayerProvider>
      </PlayerProvider>
    </>
  );
};
