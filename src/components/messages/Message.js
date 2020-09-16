import React from "react";
import { MessageContext } from "./MessageProvider"

export const Message = ({ MO }) => {
    
  return (
    <article className="message" id={MO.id}>
      <div className="entryText">
        {MO.user.name || ""}
        <span>{MO.messagetext}</span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
        //   handleLineupButtonClick();
        }}
      >
        Show User's Lineup
      </button>
    </article>
  );
};
