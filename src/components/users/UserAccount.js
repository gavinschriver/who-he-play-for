import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Image from "react-bootstrap/Image";

export const UserAccount = () => {
  const { users, getUsers, updateUser } = useContext(UserContext);

  const [user, setUser] = useState({});

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
            name="password"
            type="password"
            value={user.password}
            onChange={handleControlledInputChange}
          />
        </Form.Group>
        <ToggleButtonGroup
          type="radio"
          name="avatar"
          value={user.avatar}
          onChange={handleRadioInputChange}
        >
          <ToggleButton value={"/images/chuck-8.png"}>
              <Image width={300} height={300} src="/images/chuck-8.png" style={{backgroundColor: `transparent`}}roundedCircle />
          </ToggleButton>
          <ToggleButton value={"/images/chuck-3.jpg"}>
            <Image width={300} height={300} src="/images/chuck-3.jpg" roundedCircle />
          </ToggleButton>
          <ToggleButton value={"/images/chuck-4.jpg"}>
            <Image width={300} height={300} src="/images/chuck-4.jpg" roundedCircle />
          </ToggleButton>
        </ToggleButtonGroup>
      </Form>
      <Button
        onClick={(e) => {
          e.preventDefault();
          constructNewMessage();
        }}
      >
        Clickmeeee
      </Button>
    </>
  );
};
