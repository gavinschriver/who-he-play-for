import React from "react";
import { GenerateLineup } from "./lineup/GenerateLineup";
import { PlayerProvider } from "./players/PlayerProvider";
import { UserPlayerProvider } from "./usersPlayers/UsersPlayersProvider";
import { MessageEntryForm } from "./messages/MessageEntryForm";
import { MessageProvider } from "./messages/MessageProvider";

export const ApplicationViews = (props) => {
  return (
    <>
      <h1>HEY CHUCK, WHO HE PLAY FOR?</h1>
      <h2>MUST BE USER {parseInt(localStorage.getItem("whpf_user"))}</h2>
      <PlayerProvider>
        <MessageProvider>
          <UserPlayerProvider>
            <GenerateLineup />
            <MessageEntryForm />
          </UserPlayerProvider>
        </MessageProvider>
      </PlayerProvider>
    </>
  );
};
