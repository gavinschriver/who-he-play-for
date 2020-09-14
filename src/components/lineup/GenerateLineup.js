import React, { useState } from "react";

export const GenerateLineup = () => {
  const [lineupShowing, setLineUpShowing] = useState(false);

  const handleGenerateLineup = () => {
    if (!lineupShowing) {
      setLineUpShowing(true);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleGenerateLineup();
        }}
      >
        Generate A Lineup
      </button>
      {lineupShowing ? (
        <section>
          <h2>Today's Lineup:</h2>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};
