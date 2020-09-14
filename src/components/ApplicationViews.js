import React from "react";
import { GenerateLineup } from "./lineup/GenerateLineup";
import { PlayerProvider } from "./players/PlayerProvider";

export const ApplicationViews = (props) => {
  return (
    <>
      <div>STUFF ON A PAGEEEEE YAH HERE</div>
      <PlayerProvider>
        <GenerateLineup />
      </PlayerProvider>
    </>
  );
};
