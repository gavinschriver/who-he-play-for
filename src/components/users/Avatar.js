import React from "react";
import Image from "react-bootstrap/Image";

export const Avatar = (props) => {
  const avatarPath = props.user.avatar;
  const location = props.location;

  if (location === "greeting") {
    return <Image width={300} height={300} src={avatarPath} roundedCircle />;
  } else if (location === "message") {
    return <Image width={200} height={200} src={avatarPath} rounded />;
  }
};
