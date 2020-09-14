import React, { useState } from "react";

export const GenerateLineup = () => {
  const [lineupShowing, setLineUpShowing] = useState(false);

  const willBePlayersObjs = [
    { name: "joeshmoe" },
    { name: "elon mustttypants" },
    { name: "smelliott smitth" },
    { name: "shananaa" },
  ];

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
                  {
                      willBePlayersObjs.map((p) => {
                      return <div>{p.name}</div>
                      })
                  }
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};
