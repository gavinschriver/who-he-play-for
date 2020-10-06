import React from "react";
import moment from "moment";
import { Badge, Card } from "react-bootstrap";
import classNames from "classnames";
import styles from "./messages.css";
import UserPopOver from "../users/UserPopOver";

export const MessageHeader = (props) => {
  const user = props.userType === "current" ? "YOU" : props.userName;
  const prefix =
    props.messageType === "stan"
      ? "stan'd"
      : props.messageType === "trash"
      ? "talked trash on"
      : "hollered into the void";
  const yourGuyPrefix =
    props.messageType === "trash" && props.isYourGuy === true ? "your guy" : "";
  const player = props.playerName;
  const time = moment(props.time).format("LLL");

  return (
    <div
      className={classNames(
        styles.messageCard,
        `messageCard-header`,
        `${props.messageType}-header`
      )}
    >
      <Card.Header>
        <div className="cardHeader">
          <div className="cardHeader-content">
            <Badge>
              {" "}
              <UserPopOver user={user} userId={props.userId} />{" "}{prefix}{" "}
              {yourGuyPrefix} {player}{" "}
            </Badge>
          </div>{" "}
          <div className="cardHeader-time">{time}</div>
        </div>
      </Card.Header>
    </div>
  );
};
