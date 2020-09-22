import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UserAccount = () => {
  const { users, getUsers, updateUser } = useContext(UserContext);

  const [user, setUser] = useState({});

    useEffect(() => {
    getUsers();
    }, []);
    
    useEffect(() => {
        const foundUser = users.find(u => u.id === parseInt(localStorage.getItem("whpf_user"))) || {}
        setUser(foundUser)
    }, [users])

    const handleControlledInputChange = (event) => {
        const newUser = Object.assign({}, user);
        newUser[event.target.name] = event.target.value;
        setUser(newUser);
      };
    
      const constructNewMessage = () => {
        const updatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        };
        updateUser(updatedUser);
      };
    


  return (
    <>
      <h2>HMM</h2>
      <Form>
        <Form.Group>
          <Form.Label>UH WHAT</Form.Label>
                  <Form.Control name="name" value={user.name} onChange={handleControlledInputChange}/>
                  <Form.Control name="password" type="password" value={user.password} onChange={handleControlledInputChange}/>
        </Form.Group>
      </Form>
          <Button onClick={(e) => {
              e.preventDefault()
              constructNewMessage()
      }}>Clickmeeee</Button>
    </>
  );
};
