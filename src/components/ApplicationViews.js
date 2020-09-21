import React from "react";
import { Route } from "react-router-dom";
import { GenerateLineup } from "./lineup/GenerateLineup";
import { PlayerProvider } from "./players/PlayerProvider";
import { UserPlayerProvider } from "./usersPlayers/UsersPlayersProvider";
import { MessageEntryForm } from "./messages/MessageEntryForm";
import { MessageProvider } from "./messages/MessageProvider";
import { MessagesList } from "./messages/MessagesList";
import { UserProvider } from "./users/UserProvider";
import { GamePlay } from "./gameplay/GamePlay";
import { AppHeader } from "./header/AppHeader";
import { UserAccount } from "./users/UserAccount";

export const ApplicationViews = (props) => {
  return (
    <>
      <UserProvider>
        <PlayerProvider>
          <MessageProvider>
            <UserPlayerProvider>
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <AppHeader {...props} />
                    <GamePlay {...props} />
                    <GenerateLineup {...props} />
                    <MessagesList {...props} />
                  </>
                )}
              ></Route>
            </UserPlayerProvider>
          </MessageProvider>
        </PlayerProvider>
      </UserProvider>

      <Route exact path="/account" render={(props) => <UserAccount />}></Route>
    </>
  );
};
