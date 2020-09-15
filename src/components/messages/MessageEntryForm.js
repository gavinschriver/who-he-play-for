import React from "react";

export const MessageEntryForm = () => {
  const handleSubmitButtonEvent = () => {};

  return (
    <section class="messageEntryForm">
      <form>
        <fieldset>
          <input
                      type="text"
            name="messagetext"
            id="messagetext"
            placeholder="TALK THAT TRASH"
            required
          />
          <input
            type="url"
            name="url"
            id="url"
            placeholder="better back it up"
            pattern="https://.*"
            size="30"
            required
          ></input>
        </fieldset>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmitButtonEvent();
          }}
        >
          STAN
        </button>
      </form>
    </section>
  );
};
