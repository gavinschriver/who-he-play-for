import React, { useRef, useContext } from "react";
import { MessageContext } from "./MessageProvider";

export const MessageEntryForm = () => {
  const { addMessage } = useContext(MessageContext);

  const messagetextRef = useRef("");
  const urlRef = useRef("");

  const handleSubmitButtonEvent = () => {
    const newMessage = {
      userId: parseInt(localStorage.getItem("whpf_user")),
      messagetext: messagetextRef.current.value,
      url: urlRef.current.value,
      timestamp: Date.now(),
    };
    addMessage(newMessage);
  };
  return (
    <section class="messageEntryForm">
      <form>
        <fieldset>
          <input
            type="text"
            name="messagetext"
            id="messagetext"
            placeholder="TALK THAT TRASH"
            ref={messagetextRef}
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
            ref={urlRef}
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
