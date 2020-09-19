import React from "react";
import { Route } from "react-router-dom";
import { GenerateLineup } from "./lineup/GenerateLineup";
import { PlayerProvider } from "./players/PlayerProvider";
import { UserPlayerProvider } from "./usersPlayers/UsersPlayersProvider";
import { MessageEntryForm } from "./messages/MessageEntryForm";
import { MessageProvider } from "./messages/MessageProvider";
import { MessagesList } from "./messages/MessagesList";
import { Leaderboard } from "./leaderboard/Leaderboard";
import { UserProvider } from "./users/UserProvider";
import { StanEntryForm } from "./gameplay/StanEntryForm"
import { TrashTalkEntryForm } from "./gameplay/TrashTalkEntryForm";
import { GamePlay } from "./gameplay/GamePlay";

export const ApplicationViews = (props) => {
  return (
    <>
      <UserProvider>
        <PlayerProvider>
          <MessageProvider>
            <UserPlayerProvider>
              <GamePlay/>
              <GenerateLineup />
              <MessagesList />
            </UserPlayerProvider>
          </MessageProvider>
        </PlayerProvider>
      </UserProvider>
    </>
  );
};
