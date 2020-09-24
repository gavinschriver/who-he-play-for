import React, { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "./UserProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Image from "react-bootstrap/Image";
import { Redirect } from "react-router-dom";
import { LogoutButton } from "../header/LogoutButton";

export const UserAccount = (props) => {
  const { users, getUsers, updateUser, removeUser } = useContext(UserContext);

  const [user, setUser] = useState({});

  const pwRef = useRef("")
  const pwValidation = useRef("")

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const foundUser =
      users.find((u) => u.id === parseInt(localStorage.getItem("whpf_user"))) ||
      {};
    foundUser.avatar = "2";
    setUser(foundUser);
  }, [users]);

  const handleControlledInputChange = (event) => {
    const newUser = Object.assign({}, user);
    newUser[event.target.name] = event.target.value;
    setUser(newUser);
  };

  const handleRadioInputChange = (event) => {
    const newUser = Object.assign({}, user);
    newUser.avatar = event;
    setUser(newUser);
  };

  const constructNewMessage = () => {
    const updatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
    updateUser(updatedUser);
  };

  return (
    <>
      <h2>HMM</h2>
      <Form>
        <Form.Group>
          <Form.Label>UH WHAT</Form.Label>
          <Form.Control
            name="name"
            value={user.name}
            onChange={handleControlledInputChange}
          />
          <Form.Control
            ref={pwRef}
            name="password"
            type="password"
            value=""
            onChange={handleControlledInputChange}
          />
          <Form.Control
            ref={pwValidation}
            name="passwordValidation"
            type="password"
            value=""
          />
        </Form.Group>
        <ToggleButtonGroup
          type="radio"
          name="avatar"
          value={user.avatar}
          onChange={handleRadioInputChange}
        >
          <ToggleButton value={"/images/chuck-8.png"}>
            <Image
              width={300}
              height={300}
              src="/images/chuck-8.png"
              roundedCircle
            />
          </ToggleButton>
          <ToggleButton value={"/images/chuck-3.jpg"}>
            <Image
              width={300}
              height={300}
              src="/images/chuck-3.jpg"
              roundedCircle
            />
          </ToggleButton>
          <ToggleButton value={"/images/chuck-4.jpg"}>
            <Image
              width={300}
              height={300}
              src="/images/chuck-4.jpg"
              roundedCircle
            />
          </ToggleButton>
          <ToggleButton value={"/images/chuck-young.png"}>
            <Image
              width={300}
              height={300}
              src="/images/chuck-young.png"
              roundedCircle
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Form>
      <Button
        onClick={(e) => {
          e.preventDefault();
          constructNewMessage();
        }}
      >
        Update Account
      </Button>
      <LogoutButton location="userAccount" user={user} />

      {/* <Button
        onClick={(e) => {
          e.preventDefault();
          removeUser(user.id);
          return <Redirect to="/login" push={true} />
        }}
      >
        DIP ON OUT
      </Button> */}
    </>
  );
};
