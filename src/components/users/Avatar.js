import React from "react";
import Image from "react-bootstrap/Image"

export const Avatar = ({ user }) => {
  const avatarPath = user.avatar;

  return (
    <Image width={300} height={300} src={avatarPath} roundedCircle />
  );
};
