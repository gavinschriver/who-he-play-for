import React from "react";
import { StanEntryForm } from "./StanEntryForm";
import { TrashTalkEntryForm } from "./TrashTalkEntryForm";
import { Leaderboard } from "../leaderboard/Leaderboard";

export const GamePlay = () => (
  <>
    <Leaderboard location="game" />
    <StanEntryForm />
    <TrashTalkEntryForm />
  </>
);
