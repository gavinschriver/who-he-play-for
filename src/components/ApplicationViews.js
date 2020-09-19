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

export const ApplicationViews = (props) => {
  return (
    <>
      <UserProvider>
        <PlayerProvider>
          <MessageProvider>
            <UserPlayerProvider>    
                    <GenerateLineup />
                    <MessageEntryForm />
                    <MessagesList />
                    <Leaderboard />
            </UserPlayerProvider>
          </MessageProvider>
        </PlayerProvider>
      </UserProvider>
    </>
  );
};
