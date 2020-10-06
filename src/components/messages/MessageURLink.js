import React from "react";
import { GoLinkExternal } from "react-icons/go/";

export const MessageURLink = (props) => {
  const linkText =
    props.type === "stan"
      ? "HEAT CHECK"
      : props.type === "trash"
      ? "I'll just leave this here..."
      : "";
  const url = props.url;

  return (
    <>
      <a href={url} target="_blank">
        {linkText} <GoLinkExternal />
      </a>
      
    </>
  );
};
